import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  X,
  ArrowUpDown,
  Building2,
  Landmark,
  PieChart as PieIcon,
  Bitcoin,
  Coins,
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Wallet,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { formatMarketTime } from '../services/cseService';
import { EmptyPortfolioState } from '../components/EmptyPortfolioState';
import { GradientOutlinedCard } from '../components/GradientOutlinedCard';
import { AddInvestmentDialog } from '../components/AddInvestmentDialog';
import { SellStockDialog } from '../components/SellStockDialog';
import { LogDividendDialog } from '../components/LogDividendDialog';
import { AIInsightsDialog } from '../components/AIInsightsDialog';
import { getPalette } from '../theme/colors';
import { formatCurrency } from '../utils/formatters';
import { StockPosition, getFdCurrentValue, PortfolioSortOrder } from '../types';
import { isGoldAsset, formatGoldWeight } from '../services/goldService';

type SortOrder = PortfolioSortOrder;

export const PortfolioScreen: React.FC = () => {
  const {
    positions,
    fixedDeposits,
    unitTrusts,
    crypto,
    otherInvestments,
    removePosition,
    removeFixedDeposit,
    removeUnitTrust,
    removeCrypto,
    removeOtherInvestment,
    sellPosition,
    logDividendRecord,
    chartPaletteName,
    isDarkMode,
    refreshPrices,
    isRefreshingPrices,
    priceRefreshError,
    lastPricesUpdated,
    isMarketOpen,
  } = usePortfolio();

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedFundFilter, setSelectedFundFilter] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<SortOrder>('VALUE_DESC');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showAiDialog, setShowAiDialog] = useState(false);

  // Stock lot action states
  const [lotToSell, setLotToSell] = useState<StockPosition | null>(null);
  const [lotForDividend, setLotForDividend] = useState<StockPosition | null>(null);

  // Expanded cards state
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { name: 'Equities', icon: Building2 },
    { name: 'Fixed Deposits', icon: Landmark },
    { name: 'Unit Trusts', icon: PieIcon },
    { name: 'Crypto Currency', icon: Bitcoin },
    { name: 'Gold', icon: Coins },
    { name: 'Other', icon: Wallet },
  ];

  // Palette
  const palette = useMemo(() => {
    return getPalette(chartPaletteName, isDarkMode);
  }, [chartPaletteName, isDarkMode]);

  // Split otherInvestments into Gold and Other
  const goldInvestments = useMemo(() => {
    return otherInvestments.filter((o) => isGoldAsset(o.type, o.name, o.symbol));
  }, [otherInvestments]);

  const nonGoldInvestments = useMemo(() => {
    return otherInvestments.filter((o) => !isGoldAsset(o.type, o.name, o.symbol));
  }, [otherInvestments]);

  // Tab counts
  const tabCounts = [
    Object.keys(
      positions.reduce((acc, p) => {
        acc[p.symbol] = true;
        return acc;
      }, {} as Record<string, boolean>)
    ).length,
    fixedDeposits.length,
    unitTrusts.length,
    crypto.length,
    goldInvestments.length,
    nonGoldInvestments.length,
  ];

  // Current category Invested & Current Value
  const { currentInvested, currentValue } = useMemo(() => {
    switch (selectedTabIndex) {
      case 0: {
        const inv = positions.reduce((acc, p) => acc + p.averagePrice * p.quantity, 0);
        const cur = positions.reduce(
          (acc, p) => acc + (p.currentPrice > 0 ? p.currentPrice : p.averagePrice) * p.quantity,
          0
        );
        return { currentInvested: inv, currentValue: cur };
      }
      case 1: {
        const inv = fixedDeposits.reduce((acc, f) => acc + f.principalAmount, 0);
        const cur = fixedDeposits.reduce(
          (acc, f) => acc + (f.currentValue ?? getFdCurrentValue(f)),
          0
        );
        return { currentInvested: inv, currentValue: cur };
      }

      case 2: {
        const targetList = selectedFundFilter === 'ALL'
          ? unitTrusts
          : unitTrusts.filter((u) => (u.fundName?.trim() || 'Unspecified') === selectedFundFilter);
        const inv = targetList.reduce((acc, u) => acc + u.averageNav * u.units, 0);
        const cur = targetList.reduce(
          (acc, u) => acc + (u.currentNav > 0 ? u.currentNav : u.averageNav) * u.units,
          0
        );
        return { currentInvested: inv, currentValue: cur };
      }
      case 3: {
        const inv = crypto.reduce((acc, c) => acc + c.averagePrice * c.quantity, 0);
        const cur = crypto.reduce(
          (acc, c) => acc + (c.currentPrice > 0 ? c.currentPrice : c.averagePrice) * c.quantity,
          0
        );
        return { currentInvested: inv, currentValue: cur };
      }
      case 4: {
        // Gold
        const inv = goldInvestments.reduce(
          (acc, o) => acc + (o.quantity > 0 ? o.quantity * o.averagePrice : o.value),
          0
        );
        const cur = goldInvestments.reduce(
          (acc, o) => acc + (o.quantity > 0 ? o.quantity * o.currentPrice : o.value),
          0
        );
        return { currentInvested: inv, currentValue: cur };
      }
      case 5: {
        // Other
        const inv = nonGoldInvestments.reduce(
          (acc, o) => acc + (o.quantity > 0 ? o.quantity * o.averagePrice : o.value),
          0
        );
        const cur = nonGoldInvestments.reduce(
          (acc, o) => acc + (o.quantity > 0 ? o.quantity * o.currentPrice : o.value),
          0
        );
        return { currentInvested: inv, currentValue: cur };
      }
      default:
        return { currentInvested: 0, currentValue: 0 };
    }
  }, [selectedTabIndex, selectedFundFilter, positions, fixedDeposits, unitTrusts, crypto, goldInvestments, nonGoldInvestments]);

  const currentTitle = tabs[selectedTabIndex].name;
  const currentTabColor = palette[currentTitle] || '#818CF8';
  const currentCount = tabCounts[selectedTabIndex];

  // Grouped Stocks Filter & Sort
  const filteredGroupedStocks = useMemo(() => {
    const map = new Map<string, StockPosition[]>();
    positions.forEach((p) => {
      const list = map.get(p.symbol) || [];
      list.push(p);
      map.set(p.symbol, list);
    });

    let entries = Array.from(map.entries());

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      entries = entries.filter(([sym, lots]) => {
        const cName = lots[0]?.companyName.toLowerCase() || '';
        const sec = lots[0]?.sector.toLowerCase() || '';
        return sym.toLowerCase().includes(q) || cName.includes(q) || sec.includes(q);
      });
    }

    switch (sortOrder) {
      case 'VALUE_DESC':
        return entries.sort((a, b) => {
          const valA = a[1].reduce(
            (acc, p) => acc + (p.currentPrice > 0 ? p.currentPrice : p.averagePrice) * p.quantity,
            0
          );
          const valB = b[1].reduce(
            (acc, p) => acc + (p.currentPrice > 0 ? p.currentPrice : p.averagePrice) * p.quantity,
            0
          );
          return valB - valA;
        });
      case 'VALUE_ASC':
        return entries.sort((a, b) => {
          const valA = a[1].reduce(
            (acc, p) => acc + (p.currentPrice > 0 ? p.currentPrice : p.averagePrice) * p.quantity,
            0
          );
          const valB = b[1].reduce(
            (acc, p) => acc + (p.currentPrice > 0 ? p.currentPrice : p.averagePrice) * p.quantity,
            0
          );
          return valA - valB;
        });
      case 'NAME_ASC':
        return entries.sort((a, b) =>
          (a[1][0]?.companyName || '').localeCompare(b[1][0]?.companyName || '')
        );
      case 'GAIN_DESC':
        return entries.sort((a, b) => {
          const costA = a[1].reduce((acc, p) => acc + p.averagePrice * p.quantity, 0);
          const valA = a[1].reduce(
            (acc, p) => acc + (p.currentPrice > 0 ? p.currentPrice : p.averagePrice) * p.quantity,
            0
          );
          const gainA = costA > 0 ? (valA - costA) / costA : 0;

          const costB = b[1].reduce((acc, p) => acc + p.averagePrice * p.quantity, 0);
          const valB = b[1].reduce(
            (acc, p) => acc + (p.currentPrice > 0 ? p.currentPrice : p.averagePrice) * p.quantity,
            0
          );
          const gainB = costB > 0 ? (valB - costB) / costB : 0;

          return gainB - gainA;
        });
      default:
        return entries;
    }
  }, [positions, searchQuery, sortOrder]);

  // Unique Held Funds for Unit Trusts Filter
  const uniqueHeldFunds = useMemo(() => {
    const set = new Set<string>();
    unitTrusts.forEach((ut) => {
      set.add(ut.fundName?.trim() || 'Unspecified');
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [unitTrusts]);

  // Filtered & Sorted Unit Trusts
  const filteredUnitTrusts = useMemo(() => {
    let list = unitTrusts;
    if (selectedFundFilter !== 'ALL') {
      list = list.filter((ut) => (ut.fundName?.trim() || 'Unspecified') === selectedFundFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((ut) => {
        const fName = (ut.fundName || 'Unspecified').toLowerCase();
        const sec = (ut.sector || '').toLowerCase();
        return fName.includes(q) || sec.includes(q);
      });
    }
    switch (sortOrder) {
      case 'VALUE_DESC':
        return [...list].sort((a, b) => {
          const valA = (a.currentNav > 0 ? a.currentNav : a.averageNav) * a.units;
          const valB = (b.currentNav > 0 ? b.currentNav : b.averageNav) * b.units;
          return valB - valA;
        });
      case 'VALUE_ASC':
        return [...list].sort((a, b) => {
          const valA = (a.currentNav > 0 ? a.currentNav : a.averageNav) * a.units;
          const valB = (b.currentNav > 0 ? b.currentNav : b.averageNav) * b.units;
          return valA - valB;
        });
      case 'NAME_ASC':
        return [...list].sort((a, b) =>
          (a.fundName || 'Unspecified').localeCompare(b.fundName || 'Unspecified')
        );
      case 'GAIN_DESC':
        return [...list].sort((a, b) => {
          const costA = a.averageNav * a.units;
          const valA = (a.currentNav > 0 ? a.currentNav : a.averageNav) * a.units;
          const gainA = costA > 0 ? (valA - costA) / costA : 0;
          const costB = b.averageNav * b.units;
          const valB = (b.currentNav > 0 ? b.currentNav : b.averageNav) * b.units;
          const gainB = costB > 0 ? (valB - costB) / costB : 0;
          return gainB - gainA;
        });
      default:
        return list;
    }
  }, [unitTrusts, selectedFundFilter, searchQuery, sortOrder]);

  return (
    <div className="w-full min-h-screen pb-28 select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div>
          <h1 className="text-xl font-bold">Portfolio</h1>
          <p className="text-xs text-slate-500">Asset Holdings & Performance</p>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Insights Button */}
          <button
            onClick={() => setShowAiDialog(true)}
            title="AI Insights"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all active:scale-95"
          >
            <Sparkles size={18} className="text-indigo-500" />
          </button>

          {/* Search Toggle Button */}
          <button
            onClick={() => setIsSearchActive(!isSearchActive)}
            title="Search"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              isSearchActive
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            {isSearchActive ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* Sort Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              title="Sort"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all active:scale-95"
            >
              <ArrowUpDown size={18} />
            </button>

            {showSortMenu && (
              <div
                className="absolute right-0 top-12 z-40 w-44 rounded-2xl shadow-xl border p-1.5 flex flex-col gap-1 text-xs animate-fade-in"
                style={{
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                }}
              >
                {(
                  [
                    ['VALUE_DESC', 'Highest Value'],
                    ['VALUE_ASC', 'Lowest Value'],
                    ['NAME_ASC', 'Name (A-Z)'],
                    ['GAIN_DESC', 'Highest Return'],
                  ] as const
                ).map(([ord, label]) => (
                  <button
                    key={ord}
                    onClick={() => {
                      setSortOrder(ord);
                      setShowSortMenu(false);
                    }}
                    className={`px-3 py-2 rounded-xl text-left transition-all ${
                      sortOrder === ord
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Search Input */}
      {isSearchActive && (
        <div className="px-4 py-1.5 animate-slide-down">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ticker, or bank..."
              className="w-full pl-9 pr-9 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              style={{
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Category Pills Row */}
      <div className="flex gap-2 overflow-x-auto px-4 py-2 no-scrollbar">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isSelected = selectedTabIndex === idx;
          const count = tabCounts[idx];
          const tabColor = palette[tab.name] || '#818CF8';

          return (
            <button
              key={tab.name}
              onClick={() => setSelectedTabIndex(idx)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-200"
              style={{
                backgroundColor: isSelected ? `${tabColor}20` : isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isSelected ? tabColor : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                color: isSelected ? tabColor : isDarkMode ? '#94A3B8' : '#64748B',
              }}
            >
              <Icon size={15} />
              <span>{tab.name}</span>
              {count > 0 && (
                <span
                  className="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
                  style={{
                    backgroundColor: isSelected ? tabColor : isDarkMode ? '#334155' : '#E2E8F0',
                    color: isSelected ? '#FFFFFF' : isDarkMode ? '#F8FAFC' : '#0F172A',
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Asset Class Summary Header Card */}
      <div className="px-4 py-1.5">
        <GradientOutlinedCard className="p-4 rounded-[16px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: currentTabColor }}
              />
              <span
                className="text-[11px] font-bold tracking-wider uppercase"
                style={{ color: currentTabColor }}
              >
                {currentTitle}
              </span>
            </div>

            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                backgroundColor: `${currentTabColor}20`,
                color: currentTabColor,
              }}
            >
              {currentCount} {currentCount === 1 ? 'Holding' : 'Holdings'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            {/* Invested */}
            <div className="flex-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Wallet size={14} />
                <span>Invested</span>
              </div>
              <div className="text-sm font-bold truncate">
                {formatCurrency(currentInvested)}
              </div>
            </div>

            {/* Separator */}
            <div className="w-[1px] h-9 mx-3 bg-slate-200 dark:bg-slate-800" />

            {/* Current Value */}
            <div className="flex-1 text-right">
              <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500 mb-1">
                <TrendingUp size={14} />
                <span>Current Value</span>
              </div>
              <div className="text-sm font-bold truncate">
                {formatCurrency(currentValue)}
              </div>
            </div>
          </div>
        </GradientOutlinedCard>
      </div>

      {/* TAB CONTENT */}
      <div className="px-4 py-2 flex flex-col gap-3">
        {/* TAB 0: EQUITIES */}
        {selectedTabIndex === 0 && (
          <>
            {/* Live CSE Status Bar & Refresh Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                {isMarketOpen ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    CSE Market Live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Market Closed (Last Close)
                  </span>
                )}

                {lastPricesUpdated && (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock size={12} />
                    <span>Updated {formatMarketTime(lastPricesUpdated)}</span>
                  </span>
                )}
              </div>

              <button
                onClick={() => refreshPrices()}
                disabled={isRefreshingPrices}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold transition-all disabled:opacity-50"
                title="Fetch latest stock prices from Colombo Stock Exchange"
              >
                <RefreshCw size={13} className={isRefreshingPrices ? 'animate-spin' : ''} />
                <span>{isRefreshingPrices ? 'Updating...' : 'Refresh prices'}</span>
              </button>
            </div>

            {/* Error Banner if price sync failed */}
            {priceRefreshError && (
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="flex-shrink-0" />
                  <span>{priceRefreshError}</span>
                </div>
                <button
                  onClick={() => refreshPrices()}
                  className="font-bold underline hover:no-underline flex-shrink-0"
                >
                  Retry
                </button>
              </div>
            )}

            {positions.length === 0 ? (
              <EmptyPortfolioState
                title="No Equities Yet"
                message="Tap 'Add Asset' to log your first stock holding."
                icon={Building2}
              />
            ) : filteredGroupedStocks.length === 0 ? (
              <EmptyPortfolioState
                title="No Matching Stocks"
                message="Try searching with a different ticker or company name."
                icon={Search}
              />
            ) : (
              filteredGroupedStocks.map(([sym, lots]) => {
                const first = lots[0];
                const totalQty = lots.reduce((acc, l) => acc + l.quantity, 0);
                const totalCost = lots.reduce((acc, l) => acc + l.averagePrice * l.quantity, 0);
                const avgBuyPrice = totalQty > 0 ? totalCost / totalQty : 0;
                const curPrice = first.currentPrice > 0 ? first.currentPrice : avgBuyPrice;
                const totalVal = curPrice * totalQty;
                const diff = totalVal - totalCost;
                const diffPct = totalCost > 0 ? (diff / totalCost) * 100 : 0;
                const isProf = diff >= 0;
                const isExp = expandedCards[sym] ?? false;

                return (
                  <GradientOutlinedCard key={sym} className="p-4 rounded-[16px]">
                    {/* Top Row: Symbol + Current Value */}
                    <div
                      onClick={() => toggleExpand(sym)}
                      className="cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0"
                          style={{
                            backgroundColor: `${currentTabColor}20`,
                            color: currentTabColor,
                          }}
                        >
                          {sym.slice(0, 3)}
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-bold text-sm truncate">{sym}</h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            {first.companyName} {first.sector && `• ${first.sector}`}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-sm">{formatCurrency(totalVal)}</div>
                        <div
                          className="text-[11px] font-semibold"
                          style={{ color: isProf ? '#10B981' : '#EF4444' }}
                        >
                          {isProf ? '+' : ''}
                          {formatCurrency(diff)} ({isProf ? '+' : ''}
                          {diffPct.toFixed(2)}%)
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Buy info */}
                    <div
                      onClick={() => toggleExpand(sym)}
                      className="cursor-pointer flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800 mt-3"
                    >
                      <div className="flex items-center gap-2">
                        <span>
                          {totalQty} Shares @ Avg {formatCurrency(avgBuyPrice)}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                          {isMarketOpen ? 'Live' : 'Close'}: {formatCurrency(curPrice)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-500">
                        <span>{lots.length} Lot(s)</span>
                        {isExp ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </div>

                    {/* Expandable Purchase Lots */}
                    {isExp && (
                      <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 animate-slide-down">
                        {lots.map((lot, lIdx) => (
                          <div
                            key={lot.id}
                            className="p-3 rounded-xl border text-xs flex items-center justify-between"
                            style={{
                              backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                            }}
                          >
                            <div>
                              <div className="font-semibold">
                                Lot #{lIdx + 1} — {lot.quantity} shares
                              </div>
                              <div className="text-[11px] text-slate-500">
                                Bought @ {formatCurrency(lot.averagePrice)} on{' '}
                                {new Date(lot.purchaseDate).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Sell Button */}
                              <button
                                onClick={() => setLotToSell(lot)}
                                className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-[11px] hover:bg-indigo-700 transition-colors"
                              >
                                Sell
                              </button>

                              {/* Dividend Button */}
                              <button
                                onClick={() => setLotForDividend(lot)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-[11px] hover:bg-emerald-700 transition-colors"
                              >
                                Div
                              </button>

                              {/* Edit Button */}
                              <button
                                onClick={() => setItemToEdit(lot)}
                                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                              >
                                <Edit2 size={14} />
                              </button>

                              {/* Delete Button */}
                              <button
                                onClick={() => removePosition(lot.id)}
                                className="p-1 rounded-lg hover:bg-red-100 text-red-500"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </GradientOutlinedCard>
                );
              })
            )}
          </>
        )}

        {/* TAB 1: FIXED DEPOSITS */}
        {selectedTabIndex === 1 && (
          <>
            {fixedDeposits.length === 0 ? (
              <EmptyPortfolioState
                title="No Fixed Deposits Yet"
                message="Tap 'Add Asset' to log your bank deposits and track AIT withholding."
                icon={Landmark}
              />
            ) : (
              fixedDeposits.map((fd) => {
                const curVal = fd.currentValue ?? getFdCurrentValue(fd);
                const accrued = fd.interestWithdrawn
                  ? 0
                  : Math.max(0, curVal - fd.principalAmount);

                return (
                  <GradientOutlinedCard key={fd.id} className="p-4 rounded-[16px]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center font-bold">
                          <Landmark size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{fd.bankName}</h4>
                          <span className="text-[11px] text-slate-500">
                            {fd.periodMonths} Months @ {fd.interestRate}% p.a.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setItemToEdit(fd)}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => removeFixedDeposit(fd.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-800 my-2">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Principal</span>
                        <span className="font-bold">{formatCurrency(fd.principalAmount)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-[11px]">Current Value</span>
                        <span className="font-bold text-emerald-500">
                          {formatCurrency(curVal)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        {fd.hasAitDeduction && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 font-bold">
                            10% AIT
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium">
                          {fd.isMonthlyInterest ? 'Monthly Payout' : 'At Maturity'}
                        </span>
                      </div>
                      <span>Accrued: +{formatCurrency(accrued)}</span>
                    </div>
                  </GradientOutlinedCard>
                );
              })
            )}
          </>
        )}

        {/* TAB 2: UNIT TRUSTS */}
        {selectedTabIndex === 2 && (
          <>
            {unitTrusts.length === 0 ? (
              <EmptyPortfolioState
                title="No Unit Trusts Yet"
                message="Tap 'Add Asset' to track your mutual funds with daily UTASL prices."
                icon={PieIcon}
              />
            ) : (
              <>
                {/* Live UTASL Status Bar & Refresh Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-1 py-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      UTASL Official Prices
                    </span>

                    {lastPricesUpdated && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        <span>Updated {formatMarketTime(lastPricesUpdated)}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => refreshPrices()}
                    disabled={isRefreshingPrices}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold transition-all disabled:opacity-50"
                    title="Fetch latest unit trust prices from UTASL"
                  >
                    <RefreshCw size={13} className={isRefreshingPrices ? 'animate-spin' : ''} />
                    <span>{isRefreshingPrices ? 'Updating...' : 'Refresh UTASL'}</span>
                  </button>
                </div>

                {/* Fund Filter Selector */}
                <div className="flex items-center justify-between gap-2 px-1 mb-2">
                  <span className="text-xs font-semibold text-slate-500">Filter by Fund:</span>
                  <select
                    value={selectedFundFilter}
                    onChange={(e) => setSelectedFundFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none max-w-[220px] truncate"
                    style={{
                      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                      color: isDarkMode ? '#F8FAFC' : '#0F172A',
                    }}
                  >
                    <option value="ALL">All Funds ({unitTrusts.length})</option>
                    {uniqueHeldFunds.map((f) => {
                      const count = unitTrusts.filter((u) => (u.fundName?.trim() || 'Unspecified') === f).length;
                      return (
                        <option key={f} value={f}>
                          {f} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>

                {filteredUnitTrusts.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No unit trusts match the selected filter.
                  </div>
                ) : (
                  filteredUnitTrusts.map((ut) => {
                    const curNav = ut.currentNav > 0 ? ut.currentNav : ut.averageNav;
                    const totalCost = ut.averageNav * ut.units;
                    const totalVal = curNav * ut.units;
                    const diff = totalVal - totalCost;
                    const diffPct = totalCost > 0 ? (diff / totalCost) * 100 : 0;
                    const isProf = diff >= 0;
                    const fundDisplayName = ut.fundName?.trim() || 'Unspecified';

                    return (
                      <GradientOutlinedCard key={ut.id} className="p-4 rounded-[16px]">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold">
                              <PieIcon size={18} />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm">{fundDisplayName}</h4>
                              <span className="text-[11px] text-slate-500">{ut.sector}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setItemToEdit(ut)}
                              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              onClick={() => removeUnitTrust(ut.id)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-800 my-2">
                          <div>
                            <span className="text-slate-500 block text-[11px]">
                              {ut.units.toFixed(2)} Units @ LKR {ut.averageNav.toFixed(4)}
                            </span>
                            <span className="font-bold">{formatCurrency(totalVal)}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-500 block text-[11px]">
                              Current NAV: LKR {curNav.toFixed(4)}
                            </span>
                            <span
                              className="font-bold"
                              style={{ color: isProf ? '#10B981' : '#EF4444' }}
                            >
                              {isProf ? '+' : ''}
                              {formatCurrency(diff)} ({isProf ? '+' : ''}
                              {diffPct.toFixed(2)}%)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                            <CheckCircle2 size={14} /> UTASL Live
                          </span>
                          <span>Invested: {new Date(ut.purchaseDate).toLocaleDateString()}</span>
                        </div>
                      </GradientOutlinedCard>
                    );
                  })
                )}
              </>
            )}
          </>
        )}

        {/* TAB 3: CRYPTO */}
        {selectedTabIndex === 3 && (
          <>
            {crypto.length === 0 ? (
              <EmptyPortfolioState
                title="No Crypto Assets Yet"
                message="Tap 'Add Asset' to track cryptocurrency holdings with P2P Army live LKR rates."
                icon={Bitcoin}
              />
            ) : (
              <>
                {/* Live P2P Army Status Bar & Refresh Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-1 py-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      P2P Army Live Rates
                    </span>

                    {lastPricesUpdated && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        <span>Updated {formatMarketTime(lastPricesUpdated)}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => refreshPrices()}
                    disabled={isRefreshingPrices}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold transition-all disabled:opacity-50"
                    title="Fetch latest crypto prices from P2P Army"
                  >
                    <RefreshCw size={13} className={isRefreshingPrices ? 'animate-spin' : ''} />
                    <span>{isRefreshingPrices ? 'Updating...' : 'Refresh P2P Rates'}</span>
                  </button>
                </div>

                {crypto.map((c) => {
                const curPrice = c.currentPrice > 0 ? c.currentPrice : c.averagePrice;
                const totalCost = c.averagePrice * c.quantity;
                const totalVal = curPrice * c.quantity;
                const diff = totalVal - totalCost;
                const diffPct = totalCost > 0 ? (diff / totalCost) * 100 : 0;
                const isProf = diff >= 0;

                return (
                  <GradientOutlinedCard key={c.id} className="p-4 rounded-[16px]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center font-bold">
                          <Bitcoin size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{c.symbol}</h4>
                          <span className="text-[11px] text-slate-500">
                            {c.isPrivateWallet ? 'Private Wallet' : c.exchangeName || 'Exchange'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setItemToEdit(c)}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => removeCrypto(c.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-800 my-2">
                      <div>
                        <span className="text-slate-500 block text-[11px]">
                          {c.quantity} {c.symbol} @ {formatCurrency(c.averagePrice)}
                        </span>
                        <span className="font-bold">{formatCurrency(totalVal)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-[11px]">
                          P2P Rate: {formatCurrency(curPrice)}
                        </span>
                        <span
                          className="font-bold"
                          style={{ color: isProf ? '#10B981' : '#EF4444' }}
                        >
                          {isProf ? '+' : ''}
                          {formatCurrency(diff)} ({isProf ? '+' : ''}
                          {diffPct.toFixed(2)}%)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="text-orange-500 font-semibold">P2P Army LKR Rate</span>
                      <span>Bought: {new Date(c.purchaseDate).toLocaleDateString()}</span>
                    </div>
                  </GradientOutlinedCard>
                );
              })}
            </>
          )}
          </>
        )}

        {/* TAB 4: GOLD */}
        {selectedTabIndex === 4 && (
          <>
            {goldInvestments.length === 0 ? (
              <EmptyPortfolioState
                title="No Gold Assets Yet"
                message="Tap 'Add Asset' to track gold coins, bars, and sovereigns with live Ran Lanka rates."
                icon={Coins}
              />
            ) : (
              <>
                {/* Live Ran Lanka Gold Status Bar & Refresh Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-1 py-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      Ran Lanka Gold Rates (1 Pawn = 8g)
                    </span>

                    {lastPricesUpdated && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        <span>Updated {formatMarketTime(lastPricesUpdated)}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => refreshPrices()}
                    disabled={isRefreshingPrices}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-400 text-xs font-semibold transition-all disabled:opacity-50"
                    title="Fetch latest gold rates from ranlankagoldbuyer.com"
                  >
                    <RefreshCw size={13} className={isRefreshingPrices ? 'animate-spin' : ''} />
                    <span>{isRefreshingPrices ? 'Updating...' : 'Refresh Gold'}</span>
                  </button>
                </div>

                {goldInvestments.map((o) => {
                  const purity = o.purity || '22KT';
                  const unit = o.unit || 'PAWN';

                  const totalVal = o.quantity > 0 ? o.quantity * o.currentPrice : o.value;
                  const totalCost = o.quantity > 0 ? o.quantity * o.averagePrice : o.value;
                  const diff = totalVal - totalCost;
                  const diffPct = totalCost > 0 ? (diff / totalCost) * 100 : 0;
                  const isProf = diff >= 0;

                  return (
                    <GradientOutlinedCard key={o.id} className="p-4 rounded-[16px]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
                            <Coins size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-sm">{o.name}</h4>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                {purity}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500">
                              {formatGoldWeight(o.quantity, unit)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setItemToEdit(o)}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => removeOtherInvestment(o.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-800 my-2">
                        <div>
                          <span className="text-slate-500 block text-[11px]">
                            {o.quantity > 0
                              ? unit === 'PAWN'
                                ? `${o.quantity} ${o.quantity === 1 ? 'Pawn' : 'Pawns'}`
                                : `${o.quantity} Grams`
                              : 'Total Holding'}
                          </span>
                          <span className="font-bold text-sm">
                            {formatCurrency(totalVal)}
                          </span>
                          {totalCost > 0 && o.currentPrice > 0 && (
                            <span
                              className="block text-[11px] font-bold mt-0.5"
                              style={{ color: isProf ? '#10B981' : '#EF4444' }}
                            >
                              {isProf ? '+' : ''}
                              {formatCurrency(diff)} ({isProf ? '+' : ''}
                              {diffPct.toFixed(2)}%)
                            </span>
                          )}
                        </div>

                        <div className="text-right">
                          <span className="text-slate-500 block text-[11px]">
                            Current Rate ({unit === 'PAWN' ? 'pawn' : 'g'})
                          </span>
                          <span className="font-bold">
                            {formatCurrency(o.currentPrice > 0 ? o.currentPrice : o.averagePrice)}
                          </span>
                          {o.averagePrice > 0 && (
                            <span className="block text-[10px] text-slate-400 mt-0.5">
                              Cost: {formatCurrency(o.averagePrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 text-amber-500 font-semibold">
                          <CheckCircle2 size={14} /> Ran Lanka Live ({purity})
                        </span>
                        <span>Acquired: {new Date(o.purchaseDate).toLocaleDateString()}</span>
                      </div>
                    </GradientOutlinedCard>
                  );
                })}
              </>
            )}
          </>
        )}

        {/* TAB 5: OTHER */}
        {selectedTabIndex === 5 && (
          <>
            {nonGoldInvestments.length === 0 ? (
              <EmptyPortfolioState
                title="No Other Assets Yet"
                message="Tap 'Add Asset' to track real estate, land, commodities, and alternative investments."
                icon={Wallet}
              />
            ) : (
              nonGoldInvestments.map((o) => {
                const totalVal = o.quantity > 0 ? o.quantity * o.currentPrice : o.value;
                const totalCost = o.quantity > 0 ? o.quantity * o.averagePrice : o.value;
                const diff = totalVal - totalCost;
                const diffPct = totalCost > 0 ? (diff / totalCost) * 100 : 0;
                const isProf = diff >= 0;

                return (
                  <GradientOutlinedCard key={o.id} className="p-4 rounded-[16px]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-500/15 text-slate-500 dark:text-slate-300 flex items-center justify-center font-bold">
                          <Wallet size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{o.name}</h4>
                          <span className="text-[11px] text-slate-500">
                            {o.type} {o.symbol && `• ${o.symbol}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setItemToEdit(o)}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => removeOtherInvestment(o.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-800 my-2">
                      <div>
                        <span className="text-slate-500 block text-[11px]">
                          {o.quantity > 0 ? `${o.quantity} Units` : 'Valuation'}
                        </span>
                        <span className="font-bold text-sm">
                          {formatCurrency(totalVal)}
                        </span>
                        {totalCost > 0 && o.currentPrice > 0 && (
                          <span
                            className="block text-[11px] font-bold mt-0.5"
                            style={{ color: isProf ? '#10B981' : '#EF4444' }}
                          >
                            {isProf ? '+' : ''}
                            {formatCurrency(diff)} ({isProf ? '+' : ''}
                            {diffPct.toFixed(2)}%)
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-[11px]">
                          {o.quantity > 0 ? 'Unit Rate' : 'Cost Value'}
                        </span>
                        <span className="font-bold">
                          {formatCurrency(o.averagePrice > 0 ? o.averagePrice : o.value)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium">
                        {o.sector || o.type || 'Asset'}
                      </span>
                      <span>Acquired: {new Date(o.purchaseDate).toLocaleDateString()}</span>
                    </div>
                  </GradientOutlinedCard>
                );
              })
            )}
          </>
        )}
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => {
          setItemToEdit(null);
          setShowAddDialog(true);
        }}
        className="fixed bottom-24 right-5 z-40 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xl hover:shadow-indigo-500/25 transition-all active:scale-95"
      >
        <Plus size={18} strokeWidth={2.5} />
        <span>Add Asset</span>
      </button>

      {/* Add / Edit Investment Dialog */}
      {(showAddDialog || itemToEdit !== null) && (
        <AddInvestmentDialog
          tabIndex={selectedTabIndex}
          itemToEdit={itemToEdit}
          onDismiss={() => {
            setShowAddDialog(false);
            setItemToEdit(null);
          }}
        />
      )}

      {/* Sell Stock Dialog */}
      <SellStockDialog
        position={lotToSell}
        onDismiss={() => setLotToSell(null)}
        onSell={(pos, price, qty) => sellPosition(pos, price, qty)}
      />

      {/* Log Dividend Dialog */}
      {lotForDividend && (
        <LogDividendDialog
          availableStocks={positions}
          preSelectedPosition={lotForDividend}
          onDismiss={() => setLotForDividend(null)}
          onSave={(record) => logDividendRecord(record)}
        />
      )}

      {/* AI Insights Dialog */}
      <AIInsightsDialog
        isOpen={showAiDialog}
        onClose={() => setShowAiDialog(false)}
      />
    </div>
  );
};

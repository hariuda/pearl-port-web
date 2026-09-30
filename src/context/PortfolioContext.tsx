import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  StockPosition,
  FixedDeposit,
  UnitTrust,
  Crypto,
  OtherInvestment,
  DividendRecord,
  TradeRecord,
  AspiData,
  ThemeMode,
  calculateAccruedInterest,
  getFdCurrentValue
} from '../types';
import { StorageService } from '../services/storageService';
import { fetchAspiData, fetchTradeSummary, isCseMarketOpen } from '../services/cseService';
import { fetchUtaslFundPrices, findBestUtaslMatch } from '../services/utaslData';
import { fetchLiveP2pRates, findP2pPriceForAsset } from '../services/p2pArmyData';
import { fetchRanLankaGoldRates, getGoldPriceForAsset, isGoldAsset } from '../services/goldService';
import { generatePortfolioInsights as callGemini } from '../services/geminiService';

interface PortfolioContextType {
  positions: StockPosition[];
  fixedDeposits: FixedDeposit[];
  unitTrusts: UnitTrust[];
  crypto: Crypto[];
  otherInvestments: OtherInvestment[];
  tradeRecords: TradeRecord[];
  dividends: DividendRecord[];

  aspiData: AspiData | null;
  userName: string;
  themeMode: ThemeMode;
  isDarkMode: boolean;
  chartColorPalette: string;
  chartPaletteName: string;

  aiInsights: string | null;
  isFetchingInsights: boolean;

  isRefreshingPrices: boolean;
  priceRefreshError: string | null;
  lastPricesUpdated: Date | null;
  isMarketOpen: boolean;

  // Actions
  setUserName: (name: string) => void;
  toggleDarkMode: () => void;
  setChartColorPalette: (palette: string) => void;

  addPosition: (pos: StockPosition) => void;
  removePosition: (id: number) => void;
  sellPosition: (pos: StockPosition, sellPrice: number, sellQuantity: number) => void;

  logDividendRecord: (record: DividendRecord) => void;

  addFixedDeposit: (fd: FixedDeposit) => void;
  removeFixedDeposit: (id: number) => void;

  addUnitTrust: (ut: UnitTrust) => void;
  removeUnitTrust: (id: number) => void;

  addCrypto: (crypto: Crypto) => void;
  removeCrypto: (id: number) => void;

  addOtherInvestment: (other: OtherInvestment) => void;
  removeOtherInvestment: (id: number) => void;

  refreshPrices: () => Promise<void>;

  generateAIInsights: () => Promise<void>;

  exportTaxReport: () => string;
  exportDetailedTaxReport: () => string;
  exportBackup: () => string;
  importBackup: (json: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [positions, setPositions] = useState<StockPosition[]>(() => StorageService.getPositions());
  const [fixedDeposits, setFixedDeposits] = useState<FixedDeposit[]>(() => StorageService.getFixedDeposits());
  const [unitTrusts, setUnitTrusts] = useState<UnitTrust[]>(() => StorageService.getUnitTrusts());
  const [crypto, setCrypto] = useState<Crypto[]>(() => StorageService.getCrypto());
  const [otherInvestments, setOtherInvestments] = useState<OtherInvestment[]>(() => StorageService.getOtherInvestments());
  const [dividends, setDividends] = useState<DividendRecord[]>(() => StorageService.getDividends());
  const [tradeRecords, setTradeRecords] = useState<TradeRecord[]>(() => StorageService.getTradeRecords());

  const [userName, setUserNameState] = useState<string>(() => StorageService.getUserName());
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => StorageService.getThemeMode() as ThemeMode);
  const [chartColorPalette, setChartColorPaletteState] = useState<string>(() => StorageService.getChartColorPalette());

  const [aspiData, setAspiData] = useState<AspiData | null>(null);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isFetchingInsights, setIsFetchingInsights] = useState(false);

  const [isRefreshingPrices, setIsRefreshingPrices] = useState(false);
  const [priceRefreshError, setPriceRefreshError] = useState<string | null>(null);
  const [lastPricesUpdated, setLastPricesUpdated] = useState<Date | null>(() => {
    const ts = StorageService.getLastPricesUpdated();
    return ts ? new Date(ts) : null;
  });
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(() => isCseMarketOpen());

  // Sync state to storage
  useEffect(() => { StorageService.savePositions(positions); }, [positions]);
  useEffect(() => { StorageService.saveFixedDeposits(fixedDeposits); }, [fixedDeposits]);
  useEffect(() => { StorageService.saveUnitTrusts(unitTrusts); }, [unitTrusts]);
  useEffect(() => { StorageService.saveCrypto(crypto); }, [crypto]);
  useEffect(() => { StorageService.saveOtherInvestments(otherInvestments); }, [otherInvestments]);
  useEffect(() => { StorageService.saveDividends(dividends); }, [dividends]);
  useEffect(() => { StorageService.saveTradeRecords(tradeRecords); }, [tradeRecords]);
  useEffect(() => { StorageService.saveUserName(userName); }, [userName]);
  useEffect(() => { StorageService.saveThemeMode(themeMode); }, [themeMode]);
  useEffect(() => { StorageService.saveChartColorPalette(chartColorPalette); }, [chartColorPalette]);

  // Determine dark mode
  const [systemDark, setSystemDark] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const isDarkMode = useMemo(() => {
    if (themeMode === 'DARK') return true;
    if (themeMode === 'LIGHT') return false;
    return systemDark;
  }, [themeMode, systemDark]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initial fetches
  useEffect(() => {
    fetchAspiData().then(setAspiData).catch(console.error);
    refreshPrices().catch(console.error);

    // 30s price update polling loop
    const interval = setInterval(() => {
      refreshPrices().catch(console.error);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const refreshPrices = useCallback(async () => {
    setIsRefreshingPrices(true);
    setPriceRefreshError(null);
    setIsMarketOpen(isCseMarketOpen());

    try {
      const result = await fetchTradeSummary();
      if (result.prices && Object.keys(result.prices).length > 0) {
        setPositions(prev => prev.map(p => {
          const sym = p.symbol.trim().toUpperCase();
          const mappedSym = (sym === 'HEMA.N0000' || sym === 'HEMA') ? 'HHL.N0000' : sym;
          const newPrice = result.prices[mappedSym] 
            || result.prices[mappedSym + '.N0000']
            || result.prices[mappedSym.replace(/\.N\d{4}$/, '')]
            || result.prices[sym];

          if (typeof newPrice === 'number' && newPrice > 0 && newPrice !== p.currentPrice) {
            return { ...p, currentPrice: newPrice };
          }
          return p;
        }));
      }

      if (result.success) {
        const now = Date.now();
        setLastPricesUpdated(new Date(now));
        StorageService.saveLastPricesUpdated(now);
        setPriceRefreshError(null);
      } else {
        setPriceRefreshError(result.error || "Could not reach CSE live prices. Showing latest closing prices.");
      }

      // Also refresh ASPI
      const aspi = await fetchAspiData();
      if (aspi) {
        setAspiData(aspi);
      }

      // Update crypto from P2P Army live
      try {
        let cryptoSymbols: string[] = [];
        setCrypto(current => {
          cryptoSymbols = current.map(c => c.symbol);
          return current;
        });
        const rates = await fetchLiveP2pRates(cryptoSymbols);
        setCrypto(prev => prev.map(c => {
          const matched = findP2pPriceForAsset(c.symbol, c.exchangeName, c.isPrivateWallet, rates);
          if (matched && matched.effectivePrice > 0 && Math.abs(matched.effectivePrice - c.currentPrice) > 0.0001) {
            return { ...c, currentPrice: matched.effectivePrice };
          }
          return c;
        }));
      } catch (err) {
        console.error("Error refreshing crypto prices:", err);
      }

      // Update unit trusts from UTASL live
      try {
        const liveFunds = await fetchUtaslFundPrices();
        setUnitTrusts(prev => prev.map(ut => {
          const matched = findBestUtaslMatch(ut.fundName || '', liveFunds);
          if (matched && matched.effectiveNav > 0 && Math.abs(matched.effectiveNav - ut.currentNav) > 0.00001) {
            return { ...ut, currentNav: matched.effectiveNav };
          }
          return ut;
        }));
      } catch (err) {
        console.error("Error refreshing UTASL fund prices:", err);
      }

      // Update gold investments from Ran Lanka live rates
      try {
        const liveGold = await fetchRanLankaGoldRates();
        setOtherInvestments(prev => prev.map(o => {
          if (isGoldAsset(o.type, o.name, o.symbol)) {
            const purity = o.purity || '22KT';
            const unit = o.unit || 'PAWN';
            const livePrice = getGoldPriceForAsset(purity, unit, liveGold, 'bid');
            if (livePrice > 0 && Math.abs(livePrice - o.currentPrice) > 0.1) {
              return {
                ...o,
                currentPrice: livePrice,
                value: o.quantity > 0 ? o.quantity * livePrice : livePrice,
              };
            }
          }
          return o;
        }));
      } catch (err) {
        console.error("Error refreshing Ran Lanka gold rates:", err);
      }
    } catch (e) {
      console.error("Error refreshing prices", e);
      setPriceRefreshError("Failed to update prices from CSE. Showing last known prices.");
    } finally {
      setIsRefreshingPrices(false);
    }
  }, []);

  const setUserName = (name: string) => setUserNameState(name);
  const toggleDarkMode = () => {
    setThemeModeState(prev => (prev === 'DARK' ? 'LIGHT' : 'DARK'));
  };
  const setChartColorPalette = (palette: string) => setChartColorPaletteState(palette);

  // Position CRUD
  const addPosition = (pos: StockPosition) => {
    setPositions(prev => {
      if (pos.id > 0) {
        const idx = prev.findIndex(p => p.id === pos.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = pos;
          return updated;
        }
      }
      const newId = prev.length > 0 ? Math.max(...prev.map(p => p.id)) + 1 : 1;
      return [...prev, { ...pos, id: newId }];
    });
  };

  const removePosition = (id: number) => {
    setPositions(prev => prev.filter(p => p.id !== id));
  };

  const sellPosition = (pos: StockPosition, sellPrice: number, sellQuantity: number) => {
    const trade: TradeRecord = {
      id: Date.now(),
      symbol: pos.symbol,
      companyName: pos.companyName,
      quantity: sellQuantity,
      buyPrice: pos.averagePrice,
      sellPrice: sellPrice,
      tradeDate: Date.now()
    };
    setTradeRecords(prev => [trade, ...prev]);

    if (sellQuantity >= pos.quantity) {
      removePosition(pos.id);
    } else {
      addPosition({
        ...pos,
        quantity: pos.quantity - sellQuantity
      });
    }
  };

  // Dividends
  const logDividendRecord = (record: DividendRecord) => {
    const newRecord = {
      ...record,
      id: record.id > 0 ? record.id : Date.now()
    };
    setDividends(prev => [newRecord, ...prev]);

    // Synchronize with stock position
    setPositions(prev => {
      const match = prev.find(p => p.symbol.toLowerCase() === record.stockSymbol.toLowerCase());
      if (match) {
        return prev.map(p => p.id === match.id ? { ...p, totalDividends: p.totalDividends + record.totalAmount } : p);
      }
      return prev;
    });
  };

  // Fixed Deposits
  const addFixedDeposit = (fd: FixedDeposit) => {
    setFixedDeposits(prev => {
      if (fd.id > 0) {
        const idx = prev.findIndex(f => f.id === fd.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = fd;
          return updated;
        }
      }
      const newId = prev.length > 0 ? Math.max(...prev.map(f => f.id)) + 1 : 1;
      return [...prev, { ...fd, id: newId }];
    });
  };

  const removeFixedDeposit = (id: number) => {
    setFixedDeposits(prev => prev.filter(f => f.id !== id));
  };

  // Unit Trusts
  const addUnitTrust = (ut: UnitTrust) => {
    setUnitTrusts(prev => {
      if (ut.id > 0) {
        const idx = prev.findIndex(u => u.id === ut.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = ut;
          return updated;
        }
      }
      const newId = prev.length > 0 ? Math.max(...prev.map(u => u.id)) + 1 : 1;
      return [...prev, { ...ut, id: newId }];
    });
  };

  const removeUnitTrust = (id: number) => {
    setUnitTrusts(prev => prev.filter(u => u.id !== id));
  };

  // Crypto
  const addCrypto = (c: Crypto) => {
    setCrypto(prev => {
      if (c.id > 0) {
        const idx = prev.findIndex(item => item.id === c.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = c;
          return updated;
        }
      }
      const newId = prev.length > 0 ? Math.max(...prev.map(item => item.id)) + 1 : 1;
      return [...prev, { ...c, id: newId }];
    });
  };

  const removeCrypto = (id: number) => setCrypto(prev => prev.filter(c => c.id !== id));

  // Other Investments
  const addOtherInvestment = (o: OtherInvestment) => {
    setOtherInvestments(prev => {
      if (o.id > 0) {
        const idx = prev.findIndex(item => item.id === o.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = o;
          return updated;
        }
      }
      const newId = prev.length > 0 ? Math.max(...prev.map(item => item.id)) + 1 : 1;
      return [...prev, { ...o, id: newId }];
    });
  };

  const removeOtherInvestment = (id: number) => setOtherInvestments(prev => prev.filter(o => o.id !== id));

  // Reports
  const exportDetailedTaxReport = useCallback((): string => {
    const sdf = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const today = sdf.format(new Date());

    let sb = "";
    sb += "=================================================================================\n";
    sb += "PEARL PORT - PORTFOLIO TAX & VALUATION STATEMENT\n";
    sb += `Generated On: ${today}\n`;
    sb += "=================================================================================\n\n";

    sb += "--- EQUITIES & STOCKS ---\n";
    sb += "Symbol,Company,Quantity,Avg Buy Price (LKR),Total Cost (LKR),Current Price (LKR),Current Value (LKR),Unrealized P&L (LKR),Gain %,Dividends (LKR)\n";
    let totalStockCost = 0.0;
    let totalStockVal = 0.0;
    let totalDividends = 0.0;
    positions.forEach(p => {
      const cp = p.currentPrice > 0 ? p.currentPrice : p.averagePrice;
      const cost = p.averagePrice * p.quantity;
      const val = cp * p.quantity;
      const gain = val - cost;
      const gainPct = cost > 0 ? (gain / cost) * 100 : 0.0;
      totalStockCost += cost;
      totalStockVal += val;
      totalDividends += p.totalDividends;
      sb += `"${p.symbol}","${p.companyName}",${p.quantity},${p.averagePrice.toFixed(2)},${cost.toFixed(2)},${cp.toFixed(2)},${val.toFixed(2)},${gain.toFixed(2)},${gainPct.toFixed(2)}%,${p.totalDividends.toFixed(2)}\n`;
    });
    sb += `Subtotal Stocks Cost: LKR ${totalStockCost.toFixed(2)}, Subtotal Stocks Value: LKR ${totalStockVal.toFixed(2)}, Total Dividends: LKR ${totalDividends.toFixed(2)}\n\n`;

    sb += "--- FIXED DEPOSITS & AIT WITHHOLDING TAX ---\n";
    sb += "Bank/Institution,Principal (LKR),Interest Rate %,Payout Type,AIT 10% Deducted,Gross Interest (LKR),Tax Deducted (LKR),Net Accrued Interest (LKR),Total Value (LKR)\n";
    let totalFdPrincipal = 0.0;
    let totalTaxDeducted = 0.0;
    let totalFdVal = 0.0;
    fixedDeposits.forEach(fd => {
      const accrued = calculateAccruedInterest(fd);
      const gross = fd.hasAitDeduction ? accrued / 0.90 : accrued;
      const tax = fd.hasAitDeduction ? gross * 0.10 : 0.0;
      const curVal = getFdCurrentValue(fd);
      totalFdPrincipal += fd.principalAmount;
      totalTaxDeducted += tax;
      totalFdVal += curVal;
      const payoutType = fd.isMonthlyInterest ? "Monthly" : "At Maturity";
      const aitStatus = fd.hasAitDeduction ? "YES (10%)" : "NO";
      sb += `"${fd.bankName}",${fd.principalAmount.toFixed(2)},${fd.interestRate.toFixed(2)}%,"${payoutType}",${aitStatus},${gross.toFixed(2)},${tax.toFixed(2)},${accrued.toFixed(2)},${curVal.toFixed(2)}\n`;
    });
    sb += `Subtotal FD Principal: LKR ${totalFdPrincipal.toFixed(2)}, Total Tax Withheld: LKR ${totalTaxDeducted.toFixed(2)}, Total FD Value: LKR ${totalFdVal.toFixed(2)}\n\n`;

    sb += "--- UNIT TRUSTS ---\n";
    sb += "Fund Name,Units,Avg NAV (LKR),Current NAV (LKR),Total Cost (LKR),Current Value (LKR),Unrealized Gain (LKR)\n";
    let totalUtCost = 0.0;
    let totalUtVal = 0.0;
    unitTrusts.forEach(ut => {
      const curNav = ut.currentNav > 0 ? ut.currentNav : ut.averageNav;
      const cost = ut.averageNav * ut.units;
      const val = curNav * ut.units;
      const gain = val - cost;
      totalUtCost += cost;
      totalUtVal += val;
      sb += `"${ut.fundName || 'Unspecified'}",${ut.units},${ut.averageNav.toFixed(2)},${curNav.toFixed(2)},${cost.toFixed(2)},${val.toFixed(2)},${gain.toFixed(2)}\n`;
    });
    sb += `Subtotal Unit Trusts Cost: LKR ${totalUtCost.toFixed(2)}, Subtotal Unit Trusts Value: LKR ${totalUtVal.toFixed(2)}, Total Unrealized Gain: LKR ${(totalUtVal - totalUtCost).toFixed(2)}\n\n`;

    sb += "--- CRYPTOCURRENCY & OTHER ASSETS ---\n";
    sb += "Asset Type,Name/Symbol,Quantity,Avg Price / Value (LKR),Current Value (LKR)\n";
    crypto.forEach(c => {
      const cp = c.currentPrice > 0 ? c.currentPrice : c.averagePrice;
      sb += `Crypto,"${c.symbol}",${c.quantity},${c.averagePrice.toFixed(2)},${(cp * c.quantity).toFixed(2)}\n`;
    });
    otherInvestments.forEach(o => {
      const val = o.quantity > 0 ? (o.quantity * o.currentPrice).toFixed(2) : o.value.toFixed(2);
      sb += `"Other (${o.type})","${o.name}",${o.quantity},${o.averagePrice.toFixed(2)},${val}\n`;
    });
    sb += "\n";

    const curYear = new Date().getFullYear();
    const tradesThisYear = tradeRecords.filter(t => new Date(t.tradeDate).getFullYear() === curYear);
    sb += `--- TRADE HISTORY & REALIZED CAPITAL GAINS (FY ${curYear}) ---\n`;
    sb += "Date,Symbol,Company,Quantity,Avg Buy Price (LKR),Sell Price (LKR),Realized P&L (LKR)\n";
    let totalRealizedGains = 0.0;
    tradesThisYear.forEach(t => {
      const gain = (t.sellPrice - t.buyPrice) * t.quantity;
      totalRealizedGains += gain;
      const dateStr = sdf.format(new Date(t.tradeDate));
      sb += `${dateStr},"${t.symbol}","${t.companyName}",${t.quantity},${t.buyPrice.toFixed(2)},${t.sellPrice.toFixed(2)},${gain.toFixed(2)}\n`;
    });
    sb += `Total Realized Capital Gains (FY ${curYear}): LKR ${totalRealizedGains.toFixed(2)}\n\n`;

    sb += "--- DIVIDEND INCOME HISTORY (STOCKS) ---\n";
    sb += "Payment Date,Symbol,Company,Type,Shares Held,DPS (LKR),Total Net Dividend (LKR),Notes\n";
    let totalAllDividends = 0.0;
    dividends.forEach(d => {
      totalAllDividends += d.totalAmount;
      const dateStr = sdf.format(new Date(d.paymentDate));
      sb += `${dateStr},"${d.stockSymbol}","${d.companyName}","${d.dividendType}",${d.sharesCount},${d.amountPerShare.toFixed(2)},${d.totalAmount.toFixed(2)},"${d.notes}"\n`;
    });
    sb += `Total Dividends Received: LKR ${totalAllDividends.toFixed(2)}\n`;

    return sb;
  }, [positions, fixedDeposits, unitTrusts, crypto, otherInvestments, tradeRecords, dividends]);

  const exportTaxReport = exportDetailedTaxReport;

  const generateAIInsights = useCallback(async () => {
    if (isFetchingInsights) return;
    setIsFetchingInsights(true);
    try {
      const report = exportDetailedTaxReport();
      const insights = await callGemini(report);
      setAiInsights(insights);
    } catch (e: any) {
      setAiInsights(`Failed to load insights: ${e?.message}`);
    } finally {
      setIsFetchingInsights(false);
    }
  }, [isFetchingInsights, exportDetailedTaxReport]);

  const exportBackup = () => StorageService.exportBackup();

  const importBackup = (json: string): boolean => {
    const success = StorageService.importBackup(json);
    if (success) {
      setPositions(StorageService.getPositions());
      setFixedDeposits(StorageService.getFixedDeposits());
      setUnitTrusts(StorageService.getUnitTrusts());
      setCrypto(StorageService.getCrypto());
      setOtherInvestments(StorageService.getOtherInvestments());
      setDividends(StorageService.getDividends());
      setUserNameState(StorageService.getUserName());
      setChartColorPaletteState(StorageService.getChartColorPalette());
    }
    return success;
  };

  const contextValue: PortfolioContextType = {
    positions,
    fixedDeposits,
    unitTrusts,
    crypto,
    otherInvestments,
    tradeRecords,
    dividends,
    aspiData,
    userName,
    themeMode,
    isDarkMode,
    chartColorPalette,
    chartPaletteName: chartColorPalette,
    aiInsights,
    isFetchingInsights,
    setUserName,
    toggleDarkMode,
    setChartColorPalette,
    addPosition,
    removePosition,
    sellPosition,
    logDividendRecord,
    addFixedDeposit,
    removeFixedDeposit,
    addUnitTrust,
    removeUnitTrust,
    addCrypto,
    removeCrypto,
    addOtherInvestment,
    removeOtherInvestment,
    refreshPrices,
    isRefreshingPrices,
    priceRefreshError,
    lastPricesUpdated,
    isMarketOpen,
    generateAIInsights,
    exportTaxReport,
    exportDetailedTaxReport,
    exportBackup,
    importBackup
  };

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

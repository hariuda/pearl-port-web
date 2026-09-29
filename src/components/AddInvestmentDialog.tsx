import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Bitcoin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { fallbackUtaslFunds } from '../services/utaslData';
import { getFallbackP2pRates } from '../services/p2pArmyData';
import { formatCurrency } from '../utils/formatters';

interface AddInvestmentDialogProps {
  tabIndex: number;
  itemToEdit?: any;
  onDismiss: () => void;
}

export const AddInvestmentDialog: React.FC<AddInvestmentDialogProps> = ({
  tabIndex: initialTabIndex,
  itemToEdit,
  onDismiss,
}) => {
  const {
    addPosition,
    addFixedDeposit,
    addUnitTrust,
    addCrypto,
    addOtherInvestment,
    isDarkMode,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState(initialTabIndex);

  const utaslFundsList = fallbackUtaslFunds;
  const p2pPricesList = getFallbackP2pRates();

  // Common Form States
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [currentNavStr, setCurrentNavStr] = useState('');
  const [typeSector, setTypeSector] = useState('');
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 10));
  const [periodStr, setPeriodStr] = useState('12');
  const [isMonthlyInterest, setIsMonthlyInterest] = useState(false);
  const [hasAitDeduction, setHasAitDeduction] = useState(false);
  const [interestWithdrawn, setInterestWithdrawn] = useState(false);
  const [isPrivateWallet, setIsPrivateWallet] = useState(false);
  const [exchangeName, setExchangeName] = useState('Binance');

  // Pre-fill if editing
  useEffect(() => {
    if (itemToEdit) {
      if ('companyName' in itemToEdit) {
        // Stock
        setActiveTab(0);
        setSymbol(itemToEdit.symbol);
        setName(itemToEdit.companyName);
        setQuantity(itemToEdit.quantity.toString());
        setPrice(itemToEdit.averagePrice.toString());
        setTypeSector(itemToEdit.sector);
        setDateStr(new Date(itemToEdit.purchaseDate).toISOString().slice(0, 10));
      } else if ('bankName' in itemToEdit) {
        // FD
        setActiveTab(1);
        setName(itemToEdit.bankName);
        setQuantity(itemToEdit.principalAmount.toString());
        setPrice(itemToEdit.interestRate.toString());
        setDateStr(new Date(itemToEdit.startDate).toISOString().slice(0, 10));
        setPeriodStr(itemToEdit.periodMonths.toString());
        setIsMonthlyInterest(itemToEdit.isMonthlyInterest);
        setHasAitDeduction(itemToEdit.hasAitDeduction);
        setInterestWithdrawn(itemToEdit.interestWithdrawn);
      } else if ('fundName' in itemToEdit) {
        // Unit Trust
        setActiveTab(2);
        setName(itemToEdit.fundName);
        setQuantity(itemToEdit.units.toString());
        setPrice(itemToEdit.averageNav.toString());
        setCurrentNavStr(itemToEdit.currentNav.toString());
        setTypeSector(itemToEdit.sector);
        setDateStr(new Date(itemToEdit.purchaseDate).toISOString().slice(0, 10));
      } else if ('isPrivateWallet' in itemToEdit) {
        // Crypto
        setActiveTab(3);
        setSymbol(itemToEdit.symbol);
        setQuantity(itemToEdit.quantity.toString());
        setPrice(itemToEdit.averagePrice.toString());
        setDateStr(new Date(itemToEdit.purchaseDate).toISOString().slice(0, 10));
        setIsPrivateWallet(itemToEdit.isPrivateWallet);
        setExchangeName(itemToEdit.exchangeName || 'Binance');
      } else if ('type' in itemToEdit) {
        // Other
        setActiveTab(4);
        setName(itemToEdit.name);
        setSymbol(itemToEdit.symbol);
        setTypeSector(itemToEdit.type);
        setQuantity(itemToEdit.quantity ? itemToEdit.quantity.toString() : '');
        setPrice(
          itemToEdit.quantity > 0
            ? itemToEdit.averagePrice.toString()
            : itemToEdit.value.toString()
        );
        setDateStr(new Date(itemToEdit.purchaseDate).toISOString().slice(0, 10));
      }
    }
  }, [itemToEdit]);

  // Unit Trust Matching
  const matchedUtasl = utaslFundsList.find(
    (f: any) =>
      name &&
      (f.fundName.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(f.fundName.toLowerCase()))
  );

  // Crypto Matching
  const matchedP2pPrice = p2pPricesList.find(
    (p: any) =>
      symbol &&
      p.asset.toUpperCase() === symbol.toUpperCase() &&
      (isPrivateWallet || p.exchange.toLowerCase() === exchangeName.toLowerCase())
  );

  const actionText = itemToEdit ? 'Edit' : 'Add';
  const tabNames = ['Equities', 'Fixed Deposits', 'Unit Trusts', 'Crypto Currency', 'Gold & Other'];

  const handleSave = () => {
    try {
      const editId = itemToEdit?.id || Date.now();
      const parsedDate = new Date(dateStr).getTime() || Date.now();

      if (activeTab === 0) {
        addPosition({
          id: editId,
          symbol: symbol.trim().toUpperCase(),
          companyName: name.trim() || symbol.trim().toUpperCase(),
          quantity: parseInt(quantity, 10) || 0,
          averagePrice: parseFloat(price) || 0,
          currentPrice: itemToEdit?.currentPrice || parseFloat(price) || 0,
          sector: typeSector.trim() || 'General',
          purchaseDate: parsedDate,
          totalDividends: itemToEdit?.totalDividends || 0,
        });
      } else if (activeTab === 1) {
        const principal = parseFloat(quantity) || 0;
        const rate = parseFloat(price) || 0;
        const periodMonths = parseInt(periodStr, 10) || 12;
        const maturityDate = new Date(parsedDate);
        maturityDate.setMonth(maturityDate.getMonth() + periodMonths);

        addFixedDeposit({
          id: editId,
          bankName: name.trim(),
          principalAmount: principal,
          interestRate: rate,
          startDate: parsedDate,
          maturityDate: maturityDate.getTime(),
          periodMonths,
          isMonthlyInterest,
          hasAitDeduction,
          interestWithdrawn,
          sector: 'Fixed Deposits',
          currentValue: itemToEdit?.currentValue || principal,
        });
      } else if (activeTab === 2) {
        const units = parseFloat(quantity) || 0;
        const avgNav = parseFloat(price) || 0;
        const curNav = parseFloat(currentNavStr) || avgNav;

        addUnitTrust({
          id: editId,
          fundName: name.trim(),
          units,
          averageNav: avgNav,
          currentNav: curNav,
          purchaseDate: parsedDate,
          sector: typeSector.trim() || 'Unit Trusts',
        });
      } else if (activeTab === 3) {
        const qty = parseFloat(quantity) || 0;
        const buyPrice = parseFloat(price) || 0;
        const curPrice =
          matchedP2pPrice?.effectivePrice ||
          itemToEdit?.currentPrice ||
          buyPrice;

        addCrypto({
          id: editId,
          symbol: symbol.trim().toUpperCase(),
          quantity: qty,
          averagePrice: buyPrice,
          currentPrice: curPrice,
          purchaseDate: parsedDate,
          isPrivateWallet,
          exchangeName: isPrivateWallet ? '' : exchangeName.trim(),
          sector: 'Crypto Currency',
        });
      } else if (activeTab === 4) {
        const qty = parseFloat(quantity) || 0;
        const rateVal = parseFloat(price) || 0;
        const totalVal = qty > 0 ? qty * rateVal : rateVal;

        addOtherInvestment({
          id: editId,
          name: name.trim(),
          symbol: symbol.trim(),
          type: typeSector.trim() || 'Commodity',
          quantity: qty,
          averagePrice: rateVal,
          currentPrice: itemToEdit?.currentPrice || rateVal,
          value: totalVal,
          purchaseDate: parsedDate,
          sector: 'Gold & Other',
        });
      }

      onDismiss();
    } catch (err) {
      console.error('Failed to save investment:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
      <div
        style={{
          backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
          color: isDarkMode ? '#F8FAFC' : '#0F172A',
          borderRadius: '24px',
        }}
        className="w-full max-w-md p-6 shadow-2xl relative max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold">
            {actionText} {tabNames[activeTab]}
          </h3>
          <button onClick={onDismiss} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector (only when adding new) */}
        {!itemToEdit && (
          <div className="flex overflow-x-auto gap-1 py-2.5 no-scrollbar">
            {tabNames.map((tName, idx) => (
              <button
                key={tName}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === idx
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tName}
              </button>
            ))}
          </div>
        )}

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto pr-1 py-2 flex flex-col gap-3 text-xs">
          {/* TAB 0: EQUITIES */}
          {activeTab === 0 && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                  Symbol (e.g. COMB.N0000)
                </label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g. JKH.N0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border uppercase font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  }}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                  Company Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Commercial Bank of Ceylon PLC"
                  className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="1000"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Average Buy Price (LKR)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="115.50"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Sector
                  </label>
                  <input
                    type="text"
                    value={typeSector}
                    onChange={(e) => setTypeSector(e.target.value)}
                    placeholder="Banking / Diversified"
                    className="w-full px-3.5 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* TAB 1: FIXED DEPOSITS */}
          {activeTab === 1 && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                  Bank / Financial Institution
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Commercial Bank PLC"
                  className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Principal Amount (LKR)
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="500000"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="12.5"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Period (Months)
                  </label>
                  <input
                    type="number"
                    value={periodStr}
                    onChange={(e) => setPeriodStr(e.target.value)}
                    placeholder="12"
                    className="w-full px-3.5 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
              </div>

              {/* Switches */}
              <div
                className="p-3 rounded-xl border flex flex-col gap-2.5"
                style={{
                  backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                }}
              >
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Monthly Interest?</span>
                  <input
                    type="checkbox"
                    checked={isMonthlyInterest}
                    onChange={(e) => setIsMonthlyInterest(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
                <div className="border-t border-slate-200 dark:border-slate-800" />
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div>AIT Deduction</div>
                    <div className="text-[10px] text-slate-500">Deduct withholding tax 10%</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasAitDeduction}
                    onChange={(e) => setHasAitDeduction(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
                <div className="border-t border-slate-200 dark:border-slate-800" />
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div>Interest Withdrawn</div>
                    <div className="text-[10px] text-slate-500">Exclude accrued interest from total</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={interestWithdrawn}
                    onChange={(e) => setInterestWithdrawn(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
              </div>
            </>
          )}

          {/* TAB 2: UNIT TRUSTS */}
          {activeTab === 2 && (
            <>
              {!itemToEdit && (
                <div>
                  <span className="block text-[11px] text-slate-500 mb-1.5">
                    Popular UTASL Funds (utasl.lk):
                  </span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {utaslFundsList.slice(0, 8).map((f) => (
                      <button
                        key={f.fundName}
                        onClick={() => {
                          setName(f.fundName);
                          setCurrentNavStr(f.effectiveNav.toString());
                          if (!price) setPrice(f.effectiveNav.toString());
                          if (!typeSector) setTypeSector(f.company);
                        }}
                        className="px-2.5 py-1 rounded-lg border text-[11px] font-medium whitespace-nowrap bg-slate-50 dark:bg-slate-800 hover:border-indigo-500 text-left"
                        style={{
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                        }}
                      >
                        <div className="font-semibold">{f.fundName}</div>
                        <div className="text-[10px] text-emerald-500">NAV: LKR {f.effectiveNav}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                  Fund Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CAL Balanced Fund"
                  className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  }}
                />
              </div>

              {matchedUtasl && (
                <div
                  onClick={() => {
                    setCurrentNavStr(matchedUtasl.effectiveNav.toString());
                    if (!price) setPrice(matchedUtasl.effectiveNav.toString());
                    if (!typeSector) setTypeSector(matchedUtasl.company);
                  }}
                  className="p-2.5 rounded-xl border cursor-pointer flex items-center justify-between"
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderColor: 'rgba(16, 185, 129, 0.25)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <div>
                      <div className="font-bold text-emerald-500">
                        UTASL Price: LKR {matchedUtasl.effectiveNav}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Sell: {matchedUtasl.sellingPrice} | Buy: {matchedUtasl.buyingPrice}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-500">Tap to auto-fill</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Units Held
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="1250.5"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Average Buy NAV (LKR)
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="25.40"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                  Current / Latest NAV (LKR)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={currentNavStr}
                  onChange={(e) => setCurrentNavStr(e.target.value)}
                  placeholder="Defaults to Buy NAV if blank"
                  className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Investment Date
                  </label>
                  <input
                    type="date"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Management Company
                  </label>
                  <input
                    type="text"
                    value={typeSector}
                    onChange={(e) => setTypeSector(e.target.value)}
                    placeholder="CAL / NDB / CT CLSA"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* TAB 3: CRYPTO */}
          {activeTab === 3 && (
            <>
              {!itemToEdit && (
                <div>
                  <span className="block text-[11px] text-slate-500 mb-1.5">Popular Crypto Assets:</span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {['USDT', 'BTC', 'ETH', 'BNB', 'SOL', 'USDC'].map((cSymbol) => (
                      <button
                        key={cSymbol}
                        onClick={() => {
                          setSymbol(cSymbol);
                          const matched = p2pPricesList.find(
                            (p) => p.asset === cSymbol && p.exchange === exchangeName
                          );
                          if (matched && !price) setPrice(matched.buyPrice.toFixed(2));
                        }}
                        className={`px-3 py-1 rounded-lg border text-xs font-semibold ${
                          symbol === cSymbol
                            ? 'bg-amber-500/20 text-amber-600 border-amber-500'
                            : 'bg-slate-50 dark:bg-slate-800'
                        }`}
                        style={{
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                        }}
                      >
                        {cSymbol}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                  Symbol (e.g. USDT, BTC)
                </label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="USDT"
                  className="w-full px-3.5 py-2.5 rounded-xl border font-bold uppercase focus:ring-2 focus:ring-indigo-500 outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  }}
                />
              </div>

              <div
                className="p-3 rounded-xl border flex items-center justify-between"
                style={{
                  backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                }}
              >
                <span className="font-semibold">Stored in Private Wallet?</span>
                <input
                  type="checkbox"
                  checked={isPrivateWallet}
                  onChange={(e) => setIsPrivateWallet(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              {!isPrivateWallet && (
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Exchange Name (p2p.army)
                  </label>
                  <select
                    value={exchangeName}
                    onChange={(e) => setExchangeName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  >
                    {['Binance', 'Bybit', 'OKX', 'KuCoin', 'HTX', 'Bitget', 'Gate.io', 'MEXC'].map(
                      (ex) => (
                        <option key={ex} value={ex}>
                          {ex}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}

              {matchedP2pPrice && (
                <div
                  onClick={() => setPrice(matchedP2pPrice.buyPrice.toFixed(2))}
                  className="p-2.5 rounded-xl border cursor-pointer flex items-center justify-between"
                  style={{
                    backgroundColor: 'rgba(251, 146, 60, 0.1)',
                    borderColor: 'rgba(251, 146, 60, 0.25)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Bitcoin size={18} className="text-orange-500" />
                    <div>
                      <div className="font-bold text-orange-500">
                        P2P Army ({matchedP2pPrice.exchange}): LKR {formatCurrency(matchedP2pPrice.effectivePrice)}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Buy: {matchedP2pPrice.buyPrice.toFixed(2)} | Sell: {matchedP2pPrice.sellPrice.toFixed(2)} LKR
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-500">Auto-fill</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Quantity
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="100"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Buy Rate / Cost (LKR)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="308.50"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  }}
                />
              </div>
            </>
          )}

          {/* TAB 4: GOLD & OTHER */}
          {activeTab === 4 && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                  Name (e.g. 24K Gold Sovereign)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 24K Gold Bar (8g)"
                  className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Symbol (optional)
                  </label>
                  <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="PAXG / GOLD"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Type
                  </label>
                  <input
                    type="text"
                    value={typeSector}
                    onChange={(e) => setTypeSector(e.target.value)}
                    placeholder="Precious Metals / Real Estate"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Quantity
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="1"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                    Rate / Value (LKR)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="210000"
                    className="w-full px-3.5 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-400">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

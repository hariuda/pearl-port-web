import React, { useState, useMemo } from 'react';
import { DollarSign, X } from 'lucide-react';
import { StockPosition, DividendRecord } from '../types';
import { formatCurrency } from '../utils/formatters';
import { usePortfolio } from '../context/PortfolioContext';

interface LogDividendDialogProps {
  availableStocks: StockPosition[];
  preSelectedPosition?: StockPosition | null;
  onDismiss: () => void;
  onSave: (record: DividendRecord) => void;
}

export const LogDividendDialog: React.FC<LogDividendDialogProps> = ({
  availableStocks,
  preSelectedPosition,
  onDismiss,
  onSave,
}) => {
  const { isDarkMode } = usePortfolio();

  // Group unique stocks
  const uniqueStocks = useMemo(() => {
    const map = new Map<string, { symbol: string; companyName: string; totalQty: number; avgPrice: number }>();
    availableStocks.forEach((p) => {
      const existing = map.get(p.symbol);
      if (existing) {
        existing.totalQty += p.quantity;
      } else {
        map.set(p.symbol, {
          symbol: p.symbol,
          companyName: p.companyName,
          totalQty: p.quantity,
          avgPrice: p.averagePrice,
        });
      }
    });
    return Array.from(map.values());
  }, [availableStocks]);

  const [selectedSymbol, setSelectedSymbol] = useState(
    preSelectedPosition?.symbol || uniqueStocks[0]?.symbol || ''
  );

  const currentStock = useMemo(() => {
    return uniqueStocks.find((s) => s.symbol === selectedSymbol);
  }, [selectedSymbol, uniqueStocks]);

  const defaultShares = currentStock?.totalQty || preSelectedPosition?.quantity || 100;
  const defaultAvgPrice = currentStock?.avgPrice || preSelectedPosition?.averagePrice || 0;

  const [calculationMode, setCalculationMode] = useState<0 | 1>(0); // 0: By DPS, 1: Lump Sum
  const [dpsInput, setDpsInput] = useState('');
  const [totalAmountInput, setTotalAmountInput] = useState('');
  const [sharesHeldInput, setSharesHeldInput] = useState(defaultShares.toString());
  const [selectedType, setSelectedType] = useState('Interim');
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 10));
  const [notesInput, setNotesInput] = useState('');

  // Computations
  const computedTotal = useMemo(() => {
    if (calculationMode === 0) {
      const dps = parseFloat(dpsInput) || 0;
      const shares = parseInt(sharesHeldInput, 10) || 0;
      return dps * shares;
    } else {
      return parseFloat(totalAmountInput) || 0;
    }
  }, [calculationMode, dpsInput, totalAmountInput, sharesHeldInput]);

  const computedDps = useMemo(() => {
    if (calculationMode === 0) {
      return parseFloat(dpsInput) || 0;
    } else {
      const total = parseFloat(totalAmountInput) || 0;
      const shares = parseInt(sharesHeldInput, 10) || 0;
      return shares > 0 ? total / shares : 0;
    }
  }, [calculationMode, dpsInput, totalAmountInput, sharesHeldInput]);

  const estimatedYield = useMemo(() => {
    if (defaultAvgPrice > 0 && computedDps > 0) {
      return (computedDps / defaultAvgPrice) * 100;
    }
    return 0;
  }, [computedDps, defaultAvgPrice]);

  const handleSave = () => {
    if (computedTotal <= 0) return;

    const record: DividendRecord = {
      id: Date.now(),
      stockSymbol: selectedSymbol,
      companyName: currentStock?.companyName || '',
      amountPerShare: computedDps,
      sharesCount: parseInt(sharesHeldInput, 10) || 0,
      totalAmount: computedTotal,
      paymentDate: new Date(dateStr).getTime() || Date.now(),
      dividendType: selectedType,
      notes: notesInput.trim(),
    };

    onSave(record);
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        style={{
          backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
          color: isDarkMode ? '#F8FAFC' : '#0F172A',
          borderRadius: '24px',
        }}
        className="w-full max-w-md p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
              <DollarSign size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold">Log Dividend Payout</h3>
              <p className="text-[11px] text-slate-500">Record cash or interim payout from CSE equities</p>
            </div>
          </div>
          <button onClick={onDismiss} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        {/* Stock Selector */}
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
            Stock Holding
          </label>
          <select
            value={selectedSymbol}
            onChange={(e) => {
              setSelectedSymbol(e.target.value);
              const found = uniqueStocks.find((s) => s.symbol === e.target.value);
              if (found) setSharesHeldInput(found.totalQty.toString());
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            style={{
              backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              color: isDarkMode ? '#F8FAFC' : '#0F172A',
            }}
          >
            {uniqueStocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} — {stock.companyName} ({stock.totalQty} shares)
              </option>
            ))}
          </select>
        </div>

        {/* Mode Switcher Tabs */}
        <div
          className="flex p-1 rounded-xl mb-4 text-xs font-semibold"
          style={{ backgroundColor: isDarkMode ? '#0F172A' : '#F1F5F9' }}
        >
          <button
            onClick={() => setCalculationMode(0)}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              calculationMode === 0
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            By DPS (Per Share)
          </button>
          <button
            onClick={() => setCalculationMode(1)}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              calculationMode === 1
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            By Total Amount
          </button>
        </div>

        {/* Amount Input */}
        {calculationMode === 0 ? (
          <div className="mb-3">
            <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
              Dividend Per Share (DPS in LKR)
            </label>
            <input
              type="number"
              step="0.01"
              value={dpsInput}
              onChange={(e) => setDpsInput(e.target.value)}
              placeholder="e.g. 2.50"
              className="w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              style={{
                backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
              }}
            />
          </div>
        ) : (
          <div className="mb-3">
            <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
              Total Dividend Amount (LKR)
            </label>
            <input
              type="number"
              step="1"
              value={totalAmountInput}
              onChange={(e) => setTotalAmountInput(e.target.value)}
              placeholder="e.g. 25000"
              className="w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              style={{
                backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
              }}
            />
          </div>
        )}

        {/* Shares Held */}
        <div className="mb-3">
          <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
            Eligible Shares Held
          </label>
          <input
            type="number"
            value={sharesHeldInput}
            onChange={(e) => setSharesHeldInput(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            style={{
              backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              color: isDarkMode ? '#F8FAFC' : '#0F172A',
            }}
          />
        </div>

        {/* Dividend Type & Date */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
              Dividend Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              style={{
                backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
              }}
            >
              <option value="Interim">Interim</option>
              <option value="Final">Final</option>
              <option value="Special">Special</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
              Payment Date
            </label>
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              style={{
                backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
              }}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
            Notes (Optional)
          </label>
          <input
            type="text"
            value={notesInput}
            onChange={(e) => setNotesInput(e.target.value)}
            placeholder="e.g. Q3 interim dividend"
            className="w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            style={{
              backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              color: isDarkMode ? '#F8FAFC' : '#0F172A',
            }}
          />
        </div>

        {/* Calculation Preview Pill */}
        <div
          className="p-3 rounded-xl border mb-5 flex items-center justify-between text-xs"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(16, 185, 129, 0.25)',
          }}
        >
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Total Payout Preview</div>
            <div className="font-bold text-sm text-[#10B981]">
              {formatCurrency(computedTotal)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Yield on Cost</div>
            <div className="font-bold text-xs text-[#10B981]">
              {estimatedYield.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={computedTotal <= 0}
            className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl transition-colors shadow-sm"
          >
            Save Dividend
          </button>
        </div>
      </div>
    </div>
  );
};

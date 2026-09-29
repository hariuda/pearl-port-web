import React, { useState, useMemo } from 'react';
import {
  Download,
  Copy,
  Receipt,
  PiggyBank,
  TrendingUp,
  Wallet,
  DollarSign,
  Calculator,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GradientOutlinedCard } from '../components/GradientOutlinedCard';
import { formatCurrency } from '../utils/formatters';
import { getFdCurrentValue } from '../types';

export const ReportsScreen: React.FC = () => {
  const {
    positions,
    fixedDeposits,
    unitTrusts,
    crypto,
    otherInvestments,
    tradeRecords,
    dividends,
    exportTaxReport,
  } = usePortfolio();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentYear = new Date().getFullYear();

  // Computations
  const tradesThisYear = useMemo(() => {
    return tradeRecords.filter((t) => new Date(t.tradeDate).getFullYear() === currentYear);
  }, [tradeRecords, currentYear]);

  const totalRealizedGains = useMemo(() => {
    return tradesThisYear.reduce((acc, t) => acc + (t.sellPrice - t.buyPrice) * t.quantity, 0);
  }, [tradesThisYear]);

  // Equities
  const { totalStockVal, totalStockCost, stockGain } = useMemo(() => {
    let val = 0;
    let cost = 0;
    positions.forEach((p) => {
      const cur = p.currentPrice > 0 ? p.currentPrice : p.averagePrice;
      val += cur * p.quantity;
      cost += p.averagePrice * p.quantity;
    });
    return {
      totalStockVal: val,
      totalStockCost: cost,
      stockGain: val - cost,
    };
  }, [positions]);

  // Dividends
  const totalDividends = useMemo(() => {
    if (dividends.length > 0) {
      return dividends.reduce((acc, d) => acc + d.totalAmount, 0);
    }
    return positions.reduce((acc, p) => acc + (p.totalDividends || 0), 0);
  }, [dividends, positions]);

  const dividendYieldOnCost = totalStockCost > 0 ? (totalDividends / totalStockCost) * 100 : 0;

  // Fixed Deposits
  const { totalGrossInterest, totalAitTax, totalNetInterest, totalFdPrincipal, totalFdVal } =
    useMemo(() => {
      let gross = 0;
      let ait = 0;
      let net = 0;
      let princ = 0;
      let val = 0;

      fixedDeposits.forEach((fd) => {
        const curVal = fd.currentValue ?? getFdCurrentValue(fd);
        princ += fd.principalAmount;
        val += curVal;

        // Interest calculations matching Android
        const accrued = fd.interestWithdrawn ? 0 : Math.max(0, curVal - fd.principalAmount);
        const g = fd.hasAitDeduction ? accrued / 0.9 : accrued;
        const tax = fd.hasAitDeduction ? g * 0.1 : 0;

        gross += g;
        ait += tax;
        net += accrued;
      });

      return {
        totalGrossInterest: gross,
        totalAitTax: ait,
        totalNetInterest: net,
        totalFdPrincipal: princ,
        totalFdVal: val,
      };
    }, [fixedDeposits]);

  // Totals
  const totalUTVal = unitTrusts.reduce(
    (acc, u) => acc + (u.currentNav > 0 ? u.currentNav : u.averageNav) * u.units,
    0
  );
  const totalUTCost = unitTrusts.reduce((acc, u) => acc + u.averageNav * u.units, 0);

  const totalCryptoVal = crypto.reduce(
    (acc, c) => acc + (c.currentPrice > 0 ? c.currentPrice : c.averagePrice) * c.quantity,
    0
  );
  const totalCryptoCost = crypto.reduce((acc, c) => acc + c.averagePrice * c.quantity, 0);

  const totalOtherVal = otherInvestments.reduce(
    (acc, o) => acc + (o.quantity > 0 ? o.quantity * o.currentPrice : o.value),
    0
  );
  const totalOtherCost = otherInvestments.reduce(
    (acc, o) => acc + (o.quantity > 0 ? o.quantity * o.averagePrice : o.value),
    0
  );

  const totalNetWorth =
    totalStockVal + totalFdVal + totalUTVal + totalCryptoVal + totalOtherVal;
  const totalInvested =
    totalStockCost + totalFdPrincipal + totalUTCost + totalCryptoCost + totalOtherCost;
  const overallGain = totalNetWorth - totalInvested;

  // Handle Export CSV
  const handleExportCsv = () => {
    try {
      const csv = exportTaxReport();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '_');
      link.href = url;
      link.download = `PearlPort_Tax_Report_${dateStr}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Tax & Valuation Statement saved successfully');
    } catch (e) {
      showToast('Failed to export CSV report');
    }
  };

  // Handle Copy Summary
  const handleCopySummary = () => {
    const summary = `PEARL PORT - PORTFOLIO SUMMARY
Net Worth: ${formatCurrency(totalNetWorth)}
Total Invested: ${formatCurrency(totalInvested)}
Overall Return: ${formatCurrency(overallGain)}
Accrued FD Interest: ${formatCurrency(totalNetInterest)}
AIT Withholding Tax (10%): ${formatCurrency(totalAitTax)}`;

    navigator.clipboard.writeText(summary);
    showToast('Summary copied to clipboard');
  };

  return (
    <div className="w-full min-h-screen pb-24 px-4 pt-3 select-none flex flex-col gap-4">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-full shadow-lg border border-slate-700 animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Screen Title */}
      <div>
        <h1 className="text-xl font-bold">Tax & Reports</h1>
        <p className="text-xs text-slate-500">
          Tax statements, interest withholdings & portfolio audits
        </p>
      </div>

      {/* Summary Metric 2x3 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Value */}
        <GradientOutlinedCard className="p-3.5 rounded-[14px]">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] truncate">Total Portfolio Value</span>
            <Wallet size={16} className="text-indigo-500" />
          </div>
          <div className="text-sm font-bold truncate">{formatCurrency(totalNetWorth)}</div>
          <div
            className="text-[11px] font-semibold mt-1 truncate"
            style={{ color: overallGain >= 0 ? '#10B981' : '#EF4444' }}
          >
            {overallGain >= 0 ? '+' : ''}
            {formatCurrency(overallGain)} {overallGain >= 0 ? 'profit' : 'loss'}
          </div>
        </GradientOutlinedCard>

        {/* Total AIT Withholding */}
        <GradientOutlinedCard className="p-3.5 rounded-[14px]">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] truncate">Total AIT Withholding</span>
            <Receipt size={16} className="text-indigo-500" />
          </div>
          <div className="text-sm font-bold truncate">{formatCurrency(totalAitTax)}</div>
          <div className="text-[11px] font-semibold text-indigo-500 mt-1 truncate">
            {fixedDeposits.filter((f) => f.hasAitDeduction).length} FD(s) with 10% AIT
          </div>
        </GradientOutlinedCard>

        {/* Accrued FD Interest */}
        <GradientOutlinedCard className="p-3.5 rounded-[14px]">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] truncate">Accrued FD Interest</span>
            <PiggyBank size={16} className="text-indigo-500" />
          </div>
          <div className="text-sm font-bold truncate">{formatCurrency(totalNetInterest)}</div>
          <div className="text-[11px] font-medium text-slate-500 mt-1 truncate">
            Gross: {formatCurrency(totalGrossInterest)}
          </div>
        </GradientOutlinedCard>

        {/* Unrealized Equities P&L */}
        <GradientOutlinedCard className="p-3.5 rounded-[14px]">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] truncate">Unrealized Equities P&L</span>
            <TrendingUp size={16} className="text-indigo-500" />
          </div>
          <div className="text-sm font-bold truncate">{formatCurrency(stockGain)}</div>
          <div
            className="text-[11px] font-semibold mt-1 truncate"
            style={{ color: stockGain >= 0 ? '#10B981' : '#EF4444' }}
          >
            {totalStockCost > 0 ? ((stockGain / totalStockCost) * 100).toFixed(2) : '0.00'}% return
          </div>
        </GradientOutlinedCard>

        {/* Dividend Income */}
        <GradientOutlinedCard className="p-3.5 rounded-[14px]">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] truncate">Dividend Income</span>
            <DollarSign size={16} className="text-indigo-500" />
          </div>
          <div className="text-sm font-bold truncate">{formatCurrency(totalDividends)}</div>
          <div className="text-[11px] font-medium text-slate-500 mt-1 truncate">
            {dividends.length > 0
              ? `${dividends.length} recorded payouts`
              : `From ${positions.filter((p) => p.totalDividends > 0).length} equities`}
          </div>
        </GradientOutlinedCard>

        {/* Dividend Yield on Cost */}
        <GradientOutlinedCard className="p-3.5 rounded-[14px]">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] truncate">Dividend Yield (YoC)</span>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <div className="text-sm font-bold truncate text-[#10B981]">
            {dividendYieldOnCost.toFixed(2)}%
          </div>
          <div className="text-[11px] font-medium text-slate-500 mt-1 truncate">
            Return on stock cost
          </div>
        </GradientOutlinedCard>
      </div>

      {/* AIT / Withholding Tax Breakdown Card */}
      <GradientOutlinedCard className="p-4 rounded-[16px]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/15 text-indigo-500 flex items-center justify-center">
            <Calculator size={18} />
          </div>
          <h3 className="font-bold text-sm">AIT & Withholding Tax Summary</h3>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          Advance Income Tax (AIT) / Withholding Tax is deducted at source on eligible fixed deposits at a
          statutory rate of 10% from monthly interest accruals.
        </p>

        <div className="border-t border-slate-200 dark:border-slate-800 my-3" />

        <div className="flex flex-col gap-2.5 text-xs">
          <div className="flex justify-between items-center text-slate-500">
            <span>Gross Interest Earned</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {formatCurrency(totalGrossInterest)}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-500">
            <span>AIT Tax Deducted (10%)</span>
            <span className="font-medium text-[#EF4444]">
              - {formatCurrency(totalAitTax)}
            </span>
          </div>

          <div className="flex justify-between items-center font-bold text-sm text-slate-900 dark:text-slate-100 pt-1">
            <span>Net Accrued Interest</span>
            <span className="text-[#10B981]">{formatCurrency(totalNetInterest)}</span>
          </div>
        </div>
      </GradientOutlinedCard>

      {/* Realized Capital Gains Card */}
      <GradientOutlinedCard className="p-4 rounded-[16px]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
            <DollarSign size={18} />
          </div>
          <h3 className="font-bold text-sm">Realized Capital Gains</h3>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          Realized gains from trading activities for the current fiscal year (FY {currentYear}).
        </p>

        <div className="border-t border-slate-200 dark:border-slate-800 my-3" />

        <div className="flex flex-col gap-2.5 text-xs">
          <div className="flex justify-between items-center text-slate-500">
            <span>Total Trades (FY {currentYear})</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {tradesThisYear.length}
            </span>
          </div>

          <div className="flex justify-between items-center font-bold text-sm text-slate-900 dark:text-slate-100 pt-1">
            <span>Net Realized Gains</span>
            <span
              style={{
                color: totalRealizedGains >= 0 ? '#10B981' : '#EF4444',
              }}
            >
              {totalRealizedGains >= 0 ? '+' : ''}
              {formatCurrency(totalRealizedGains)}
            </span>
          </div>
        </div>
      </GradientOutlinedCard>

      {/* Export Actions Section */}
      <GradientOutlinedCard className="p-4 rounded-[16px]">
        <h3 className="font-bold text-sm mb-1">Export Documents</h3>
        <p className="text-xs text-slate-500 mb-4">
          Generate structured audit reports compatible with Excel, Apple Numbers, and tax filing
          software.
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleExportCsv}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
          >
            <Download size={16} />
            <span>Export Tax & Valuation Report (CSV)</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="w-full py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Copy size={16} />
            <span>Copy Summary to Clipboard</span>
          </button>
        </div>
      </GradientOutlinedCard>
    </div>
  );
};

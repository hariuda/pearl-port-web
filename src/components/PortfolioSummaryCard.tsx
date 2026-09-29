import React from 'react';
import { Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { usePortfolio } from '../context/PortfolioContext';

interface PortfolioSummaryCardProps {
  totalValue: number;
  invested: number;
  todaysChange: number;
  todaysChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
}

export const PortfolioSummaryCard: React.FC<PortfolioSummaryCardProps> = ({
  totalValue,
  invested,
  todaysChange,
  todaysChangePercent,
  totalReturn,
  totalReturnPercent,
}) => {
  const { isDarkMode } = usePortfolio();
  const numTotalValue = Number(totalValue);

  const isPositiveReturn = totalReturn >= 0;
  const returnColor = isPositiveReturn ? '#10B981' : '#EF4444';
  const returnSign = isPositiveReturn ? '+' : '';

  return (
    <div className="w-full px-4 py-1.5">
      <div
        className="relative overflow-hidden rounded-[24px] p-5 shadow-lg border text-white transition-all select-none"
        style={{
          background: isDarkMode
            ? 'linear-gradient(135deg, #1E1644 0%, #33206A 50%, #1E1035 100%)'
            : 'linear-gradient(135deg, #2C2260 0%, #3C2C7A 50%, #2C2260 100%)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: isDarkMode
            ? '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(44, 34, 96, 0.3)'
            : '0 10px 30px -5px rgba(44, 34, 96, 0.3)',
        }}
      >
        {/* Subtle decorative background circles */}
        <div
          className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
        />
        <div
          className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full pointer-events-none"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
        />

        {/* Top Header Row */}
        <div className="relative z-10 flex items-center justify-between">
          <span
            className="text-[11px] font-semibold tracking-wider uppercase"
            style={{ color: 'rgba(255, 255, 255, 0.75)' }}
          >
            TOTAL PORTFOLIO VALUE
          </span>

          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-xl border text-[10px] font-bold"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>CSE LIVE</span>
          </div>
        </div>

        {/* Total Value */}
        <div className="relative z-10 mt-1 mb-4">
          <div className="text-[28px] font-extrabold tracking-tight leading-none text-white drop-shadow-sm">
            {formatCurrency(numTotalValue)}
          </div>
        </div>

        {/* 24h Change & Total Return Pills */}
        <div className="relative z-10 grid grid-cols-2 gap-2.5 mb-3.5">
          {/* Today's Change */}
          <div
            className="p-2.5 rounded-xl border flex flex-col justify-center"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.22)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <span
              className="text-[11px] font-medium"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Today's Change
            </span>
            <span className="text-xs font-bold mt-0.5 truncate text-[#10B981]">
              +{formatCurrency(todaysChange).replace('LKR ', '')} (+{todaysChangePercent}%)
            </span>
          </div>

          {/* Total Return */}
          <div
            className="p-2.5 rounded-xl border flex flex-col justify-center"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.22)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <span
              className="text-[11px] font-medium"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Total Return
            </span>
            <span
              className="text-xs font-bold mt-0.5 truncate"
              style={{ color: returnColor }}
            >
              {returnSign}{formatCurrency(totalReturn).replace('LKR ', '')} ({returnSign}
              {totalReturnPercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Invested Capital Row */}
        <div
          className="relative z-10 flex items-center justify-between px-3.5 py-2 rounded-xl border"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
            <Wallet size={15} className="text-white/80" />
            <span>Total Capital Invested</span>
          </div>
          <span className="text-xs font-bold text-white">
            {formatCurrency(invested)}
          </span>
        </div>
      </div>
    </div>
  );
};

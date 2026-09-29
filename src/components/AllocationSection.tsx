import React from 'react';
import { GradientOutlinedCard } from './GradientOutlinedCard';
import { formatCurrency } from '../utils/formatters';
import { usePortfolio } from '../context/PortfolioContext';

interface AllocationSectionProps {
  data: Record<string, number>;
  total: number;
  palette: Record<string, string>;
  fallbackColors?: string[];
}

export const AllocationSection: React.FC<AllocationSectionProps> = ({
  data,
  total,
  palette,
  fallbackColors = [],
}) => {
  const { isDarkMode } = usePortfolio();
  const sortedEntries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  if (sortedEntries.length === 0) return null;

  const defaultColor = isDarkMode ? '#818CF8' : '#2C2260';

  return (
    <div className="w-full px-4 py-1.5">
      <GradientOutlinedCard className="p-4 rounded-[14px]">
        <div className="flex flex-col">
          {sortedEntries.map(([key, value], index) => {
            const percentage = total > 0 ? (value / total) * 100 : 0;
            const color =
              palette[key] ||
              (fallbackColors.length > 0
                ? fallbackColors[index % fallbackColors.length]
                : defaultColor);

            return (
              <React.Fragment key={key}>
                <div className="py-2">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    {/* Left: Dot & Name */}
                    <div className="flex items-center gap-2.5 min-w-0 mr-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span
                        className="font-medium truncate"
                        style={{ color: isDarkMode ? '#F1F5F9' : '#1E293B' }}
                      >
                        {key}
                      </span>
                    </div>

                    {/* Right: Currency & Percentage */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className="text-[11px]"
                        style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
                      >
                        {formatCurrency(value)}
                      </span>
                      <span
                        className="font-bold text-xs"
                        style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
                      >
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div
                    className="w-full h-[5px] rounded-[3px] overflow-hidden"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    }}
                  >
                    <div
                      className="h-full rounded-[3px] transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.max(0, percentage))}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>

                {index < sortedEntries.length - 1 && (
                  <div
                    className="w-full h-[1px]"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </GradientOutlinedCard>
    </div>
  );
};

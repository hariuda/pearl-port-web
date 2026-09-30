import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { HeaderSection } from '../components/HeaderSection';
import { PortfolioSummaryCard } from '../components/PortfolioSummaryCard';
import { SectionTitle } from '../components/SectionTitle';
import { GradientOutlinedCard } from '../components/GradientOutlinedCard';
import { PerformanceLineChart } from '../components/PerformanceLineChart';
import { SectorPieChart } from '../components/SectorPieChart';
import { AllocationSection } from '../components/AllocationSection';
import { getPalette, getSectorPalette } from '../theme/colors';
import { getFdCurrentValue } from '../types';
import { isGoldAsset } from '../services/goldService';

interface DashboardScreenProps {
  onNavigateToAllocation: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigateToAllocation }) => {
  const {
    positions,
    fixedDeposits,
    unitTrusts,
    crypto,
    otherInvestments,
    aspiData,
    chartPaletteName,
    isDarkMode,
  } = usePortfolio();

  const [selectedTimeRange, setSelectedTimeRange] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');

  // Compute total values per asset class
  const {
    totalStocksValue,
    totalFdValue,
    totalUTValue,
    totalCryptoValue,
    totalOtherValue,
    totalInvested,
    sectorMap,
  } = useMemo(() => {
    let sVal = 0;
    let inv = 0;
    const sMap: Record<string, number> = {};

    // Equities
    positions.forEach((p) => {
      const curPrice = p.currentPrice > 0 ? p.currentPrice : p.averagePrice;
      const v = curPrice * p.quantity;
      sVal += v;
      inv += p.averagePrice * p.quantity;
    });
    if (sVal > 0) sMap['Equities'] = sVal;

    // FDs
    let fdVal = 0;
    fixedDeposits.forEach((fd) => {
      const val = fd.currentValue ?? getFdCurrentValue(fd);
      fdVal += val;
      inv += fd.principalAmount;
    });
    if (fdVal > 0) sMap['Fixed Deposits'] = fdVal;

    // Unit Trusts
    let utVal = 0;
    unitTrusts.forEach((ut) => {
      const curNav = ut.currentNav > 0 ? ut.currentNav : ut.averageNav;
      utVal += curNav * ut.units;
      inv += ut.averageNav * ut.units;
    });
    if (utVal > 0) sMap['Unit Trusts'] = utVal;

    // Crypto
    let cVal = 0;
    crypto.forEach((c) => {
      const curPrice = c.currentPrice > 0 ? c.currentPrice : c.averagePrice;
      cVal += curPrice * c.quantity;
      inv += c.averagePrice * c.quantity;
    });
    if (cVal > 0) sMap['Crypto Currency'] = cVal;

    // Gold & Other
    let oVal = 0;
    let goldVal = 0;
    let otherVal = 0;
    otherInvestments.forEach((o) => {
      const cur = o.quantity > 0 ? o.quantity * o.currentPrice : o.value;
      const cost = o.quantity > 0 ? o.quantity * o.averagePrice : o.value;
      oVal += cur;
      inv += cost;
      if (isGoldAsset(o.type, o.name, o.symbol)) {
        goldVal += cur;
      } else {
        otherVal += cur;
      }
    });
    if (goldVal > 0) sMap['Gold'] = goldVal;
    if (otherVal > 0) sMap['Other'] = otherVal;

    return {
      totalStocksValue: sVal,
      totalFdValue: fdVal,
      totalUTValue: utVal,
      totalCryptoValue: cVal,
      totalOtherValue: oVal,
      totalInvested: inv,
      sectorMap: sMap,
    };
  }, [positions, fixedDeposits, unitTrusts, crypto, otherInvestments]);

  const totalAssets = totalStocksValue + totalFdValue + totalUTValue + totalCryptoValue + totalOtherValue;
  const totalReturn = totalAssets - totalInvested;
  const returnPercent = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  // Today's change simulation matching Android
  const todaysChange = totalAssets * 0.0068;
  const todaysChangePercent = 0.68;

  // Chart Color Palette
  const palette = useMemo(() => {
    return getPalette(chartPaletteName, isDarkMode);
  }, [chartPaletteName, isDarkMode]);

  const sectorFallbackColors = useMemo(() => {
    return getSectorPalette(chartPaletteName, isDarkMode);
  }, [chartPaletteName, isDarkMode]);

  // Performance Chart Data Calculations matching Android
  const { chartPoints, minVal, maxVal, startMillis, periodReturn, mockAspiPeriodReturn } = useMemo(() => {
    const now = Date.now();
    let sMillis = now - 30 * 86400000;
    if (selectedTimeRange === '1D') sMillis = now - 86400000;
    else if (selectedTimeRange === '1W') sMillis = now - 7 * 86400000;
    else if (selectedTimeRange === '1M') sMillis = now - 30 * 86400000;
    else if (selectedTimeRange === '1Y') sMillis = now - 365 * 86400000;
    else {
      // ALL
      const allDates = [
        ...positions.map((p) => p.purchaseDate),
        ...fixedDeposits.map((f) => f.startDate),
        ...unitTrusts.map((u) => u.purchaseDate),
        ...crypto.map((c) => c.purchaseDate),
        ...otherInvestments.map((o) => o.purchaseDate),
      ];
      sMillis = allDates.length > 0 ? Math.min(...allDates) : now - 30 * 86400000;
      if (sMillis >= now) sMillis = now - 86400000;
    }

    const numPoints = 20;
    const step = (now - sMillis) / Math.max(1, numPoints);
    const rawValues: number[] = [];
    let mx = 0;
    let mn = Number.MAX_VALUE;

    for (let i = 0; i <= numPoints; i++) {
      const t = sMillis + i * step;
      let valAtT = 0;

      positions.forEach((p) => {
        if (t >= p.purchaseDate) {
          const progress = (t - p.purchaseDate) / Math.max(1, now - p.purchaseDate);
          valAtT += (p.averagePrice + (p.currentPrice - p.averagePrice) * progress) * p.quantity;
        }
      });
      fixedDeposits.forEach((fd) => {
        if (t >= fd.startDate) {
          const progress = (t - fd.startDate) / Math.max(1, now - fd.startDate);
          const curVal = fd.currentValue ?? getFdCurrentValue(fd);
          valAtT += fd.principalAmount + (curVal - fd.principalAmount) * progress;
        }
      });
      unitTrusts.forEach((ut) => {
        if (t >= ut.purchaseDate) {
          const progress = (t - ut.purchaseDate) / Math.max(1, now - ut.purchaseDate);
          const cur = ut.currentNav > 0 ? ut.currentNav : ut.averageNav;
          valAtT += (ut.averageNav + (cur - ut.averageNav) * progress) * ut.units;
        }
      });
      crypto.forEach((c) => {
        if (t >= c.purchaseDate) {
          const progress = (t - c.purchaseDate) / Math.max(1, now - c.purchaseDate);
          const cur = c.currentPrice > 0 ? c.currentPrice : c.averagePrice;
          valAtT += (c.averagePrice + (cur - c.averagePrice) * progress) * c.quantity;
        }
      });
      otherInvestments.forEach((o) => {
        if (t >= o.purchaseDate) valAtT += o.value;
      });

      rawValues.push(valAtT);
      if (valAtT > mx) mx = valAtT;
      if (valAtT < mn) mn = valAtT;
    }

    const range = mx - mn;
    const normalizedPoints =
      range === 0
        ? new Array(numPoints + 1).fill(0.5)
        : rawValues.map((v) => 1.0 - (v - mn) / range);

    let initialVal = 0;
    positions.forEach((p) => {
      if (sMillis >= p.purchaseDate) initialVal += p.averagePrice * p.quantity;
    });
    fixedDeposits.forEach((fd) => {
      if (sMillis >= fd.startDate) initialVal += fd.principalAmount;
    });
    unitTrusts.forEach((ut) => {
      if (sMillis >= ut.purchaseDate) initialVal += ut.averageNav * ut.units;
    });
    crypto.forEach((c) => {
      if (sMillis >= c.purchaseDate) initialVal += c.averagePrice * c.quantity;
    });
    otherInvestments.forEach((o) => {
      if (sMillis >= o.purchaseDate) initialVal += o.value;
    });

    const pReturn = initialVal > 0 ? ((totalAssets - initialVal) / initialVal) * 100 : 0;
    const aspiPct = aspiData?.percentage || 0;
    const mockAspi =
      selectedTimeRange === '1D'
        ? aspiPct
        : selectedTimeRange === '1W'
        ? aspiPct * 5
        : selectedTimeRange === '1M'
        ? aspiPct * 20
        : selectedTimeRange === '1Y'
        ? aspiPct * 250
        : aspiPct * 500;

    return {
      chartPoints: normalizedPoints,
      minVal: mn === Number.MAX_VALUE ? 0 : mn,
      maxVal: mx,
      startMillis: sMillis,
      periodReturn: pReturn,
      mockAspiPeriodReturn: mockAspi,
    };
  }, [selectedTimeRange, positions, fixedDeposits, unitTrusts, crypto, otherInvestments, totalAssets, aspiData]);

  const isOutperforming = periodReturn >= mockAspiPeriodReturn;
  const diff = Math.abs(periodReturn - mockAspiPeriodReturn);

  // Sector Maps
  const equitiesSectorMap = useMemo(() => {
    const map: Record<string, number> = {};
    positions.forEach((p) => {
      const cur = p.currentPrice > 0 ? p.currentPrice : p.averagePrice;
      const v = cur * p.quantity;
      map[p.sector || 'General'] = (map[p.sector || 'General'] || 0) + v;
    });
    return map;
  }, [positions]);

  const fdMap = useMemo(() => {
    const map: Record<string, number> = {};
    fixedDeposits.forEach((fd) => {
      const val = fd.currentValue ?? getFdCurrentValue(fd);
      map[fd.bankName] = (map[fd.bankName] || 0) + val;
    });
    return map;
  }, [fixedDeposits]);

  const utMap = useMemo(() => {
    const map: Record<string, number> = {};
    unitTrusts.forEach((ut) => {
      const v = (ut.currentNav > 0 ? ut.currentNav : ut.averageNav) * ut.units;
      const fName = ut.fundName?.trim() || 'Unspecified';
      map[fName] = (map[fName] || 0) + v;
    });
    return map;
  }, [unitTrusts]);

  const cryptoMap = useMemo(() => {
    const map: Record<string, number> = {};
    crypto.forEach((c) => {
      const v = (c.currentPrice > 0 ? c.currentPrice : c.averagePrice) * c.quantity;
      map[c.symbol] = (map[c.symbol] || 0) + v;
    });
    return map;
  }, [crypto]);

  return (
    <div className="w-full min-h-screen pb-24">
      {/* Header Bar */}
      <HeaderSection />

      {/* Hero Summary Card */}
      <PortfolioSummaryCard
        totalValue={totalAssets}
        invested={totalInvested}
        todaysChange={todaysChange}
        todaysChangePercent={todaysChangePercent}
        totalReturn={totalReturn}
        totalReturnPercent={returnPercent}
      />

      {/* Portfolio Performance Section */}
      <SectionTitle title="Portfolio Performance" />
      <div className="px-4 py-1">
        <GradientOutlinedCard className="p-4 rounded-[16px]">
          {/* Time Range Chips */}
          <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
            {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((range) => {
              const isSelected = selectedTimeRange === range;
              return (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {range}
                </button>
              );
            })}
          </div>

          {/* Line Chart */}
          <div className="w-full my-2">
            <PerformanceLineChart
              points={chartPoints}
              rawMin={minVal}
              rawMax={maxVal}
              startMillis={startMillis}
              timeRange={selectedTimeRange}
            />
          </div>


          {/* Divider */}
          <div className="w-full h-[1px] my-3 bg-slate-200 dark:bg-slate-800" />

          {/* vs ASPI comparison row */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 block">
                vs ASPI ({selectedTimeRange})
              </span>
              <span
                className="text-sm font-bold block"
                style={{ color: periodReturn >= 0 ? '#10B981' : '#EF4444' }}
              >
                {periodReturn >= 0 ? '+' : ''}
                {periodReturn.toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-500">
                ASPI: {mockAspiPeriodReturn >= 0 ? '+' : ''}
                {mockAspiPeriodReturn.toFixed(2)}%
              </span>
            </div>

            <div className="text-[11px] text-slate-500 max-w-[170px] text-center leading-tight">
              Your portfolio is {isOutperforming ? 'outperforming' : 'underperforming'} the ASPI by{' '}
              <strong className={isOutperforming ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                {diff.toFixed(2)}%
              </strong>
            </div>

            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: isOutperforming ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: isOutperforming ? '#10B981' : '#EF4444',
              }}
            >
              {isOutperforming ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
          </div>
        </GradientOutlinedCard>
      </div>

      {/* Asset Allocation Card */}
      <div className="px-4 py-2 mt-2">
        <GradientOutlinedCard
          onClick={onNavigateToAllocation}
          className="p-4 rounded-[16px] cursor-pointer hover:border-indigo-400 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">Asset Allocation</h3>
            <span className="text-xs font-semibold text-indigo-500 flex items-center gap-0.5">
              View Details <ChevronRight size={14} />
            </span>
          </div>

          <div className="flex items-center justify-around gap-4">
            {/* Donut Chart */}
            <div className="relative flex-shrink-0 flex items-center justify-center">
              <SectorPieChart
                data={sectorMap}
                colors={Object.keys(sectorMap).map((k) => palette[k] || '#818CF8')}
                size={120}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[9px] text-slate-500 font-bold uppercase">LKR</span>
                <span className="text-xs font-extrabold tracking-tight">
                  {(totalAssets / 1000000).toFixed(2)}M
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2">
              {Object.entries(sectorMap).map(([key, val]) => {
                const pct = totalAssets > 0 ? (val / totalAssets) * 100 : 0;
                const dotColor = palette[key] || '#818CF8';
                return (
                  <div key={key} className="flex items-center gap-2 text-xs">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: dotColor }}
                    />
                    <span className="w-24 truncate text-slate-600 dark:text-slate-300 font-medium">
                      {key}
                    </span>
                    <span className="font-bold">{pct.toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </GradientOutlinedCard>
      </div>

      {/* Equities by Sector */}
      {totalStocksValue > 0 && (
        <>
          <SectionTitle title="Equities by Sector" />
          <AllocationSection
            data={equitiesSectorMap}
            total={totalStocksValue}
            palette={palette}
            fallbackColors={sectorFallbackColors}
          />
        </>
      )}

      {/* Fixed Deposits by Institution */}
      {fixedDeposits.length > 0 && (
        <>
          <SectionTitle title="Fixed Deposits by Institution" />
          <AllocationSection
            data={fdMap}
            total={totalFdValue}
            palette={palette}
            fallbackColors={sectorFallbackColors}
          />
        </>
      )}

      {/* Unit Trusts by Fund */}
      {unitTrusts.length > 0 && (
        <>
          <SectionTitle title="Unit Trusts by Fund" />
          <AllocationSection
            data={utMap}
            total={totalUTValue}
            palette={palette}
            fallbackColors={sectorFallbackColors}
          />
        </>
      )}

      {/* Crypto by Asset */}
      {crypto.length > 0 && (
        <>
          <SectionTitle title="Crypto by Asset" />
          <AllocationSection
            data={cryptoMap}
            total={totalCryptoValue}
            palette={palette}
            fallbackColors={sectorFallbackColors}
          />
        </>
      )}
    </div>
  );
};

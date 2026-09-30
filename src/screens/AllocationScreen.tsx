import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectorPieChart } from '../components/SectorPieChart';
import { SectionTitle } from '../components/SectionTitle';
import { AllocationSection } from '../components/AllocationSection';
import { GradientOutlinedCard } from '../components/GradientOutlinedCard';
import { getPalette, getSectorPalette } from '../theme/colors';
import { getFdCurrentValue } from '../types';
import { formatCurrency } from '../utils/formatters';
import { isGoldAsset } from '../services/goldService';

interface AllocationScreenProps {
  onNavigateBack: () => void;
}

export const AllocationScreen: React.FC<AllocationScreenProps> = ({ onNavigateBack }) => {
  const {
    positions,
    fixedDeposits,
    unitTrusts,
    crypto,
    otherInvestments,
    chartPaletteName,
    isDarkMode,
  } = usePortfolio();

  // Color Palettes
  const palette = useMemo(() => {
    return getPalette(chartPaletteName, isDarkMode);
  }, [chartPaletteName, isDarkMode]);

  const sectorFallbackColors = useMemo(() => {
    return getSectorPalette(chartPaletteName, isDarkMode);
  }, [chartPaletteName, isDarkMode]);

  // Aggregate values
  const {
    totalAssets,
    totalStocksValue,
    totalFdValue,
    totalUTValue,
    totalCryptoValue,
    assetClassMap,
    equitiesSectorMap,
    fdMap,
    utMap,
    cryptoMap,
  } = useMemo(() => {
    let sVal = 0;
    const eqSecMap: Record<string, number> = {};
    positions.forEach((p) => {
      const cur = p.currentPrice > 0 ? p.currentPrice : p.averagePrice;
      const v = cur * p.quantity;
      sVal += v;
      eqSecMap[p.sector || 'General'] = (eqSecMap[p.sector || 'General'] || 0) + v;
    });

    let fdVal = 0;
    const fMap: Record<string, number> = {};
    fixedDeposits.forEach((fd) => {
      const val = fd.currentValue ?? getFdCurrentValue(fd);
      fdVal += val;
      fMap[fd.bankName] = (fMap[fd.bankName] || 0) + val;
    });

    let utVal = 0;
    const uMap: Record<string, number> = {};
    unitTrusts.forEach((ut) => {
      const v = (ut.currentNav > 0 ? ut.currentNav : ut.averageNav) * ut.units;
      utVal += v;
      const fName = ut.fundName?.trim() || 'Unspecified';
      uMap[fName] = (uMap[fName] || 0) + v;
    });

    let cVal = 0;
    const cMap: Record<string, number> = {};
    crypto.forEach((c) => {
      const v = (c.currentPrice > 0 ? c.currentPrice : c.averagePrice) * c.quantity;
      cVal += v;
      cMap[c.symbol] = (cMap[c.symbol] || 0) + v;
    });

    let goldVal = 0;
    let otherVal = 0;
    otherInvestments.forEach((o) => {
      const v = o.quantity > 0 ? o.quantity * o.currentPrice : o.value;
      if (isGoldAsset(o.type, o.name, o.symbol)) {
        goldVal += v;
      } else {
        otherVal += v;
      }
    });

    const tot = sVal + fdVal + utVal + cVal + goldVal + otherVal;
    const acMap: Record<string, number> = {};
    if (sVal > 0) acMap['Equities'] = sVal;
    if (fdVal > 0) acMap['Fixed Deposits'] = fdVal;
    if (utVal > 0) acMap['Unit Trusts'] = utVal;
    if (cVal > 0) acMap['Crypto Currency'] = cVal;
    if (goldVal > 0) acMap['Gold'] = goldVal;
    if (otherVal > 0) acMap['Other'] = otherVal;

    return {
      totalAssets: tot,
      totalStocksValue: sVal,
      totalFdValue: fdVal,
      totalUTValue: utVal,
      totalCryptoValue: cVal,
      assetClassMap: acMap,
      equitiesSectorMap: eqSecMap,
      fdMap: fMap,
      utMap: uMap,
      cryptoMap: cMap,
    };
  }, [positions, fixedDeposits, unitTrusts, crypto, otherInvestments]);

  return (
    <div className="w-full min-h-screen pb-24 select-none">
      {/* Top App Bar */}
      <div className="flex items-center px-4 py-3 gap-3 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onNavigateBack}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-base font-bold">Asset Allocation</h1>
          <p className="text-[11px] text-slate-500">Portfolio Distribution & Diversification</p>
        </div>
      </div>

      {/* Main Allocation Donut Chart Card */}
      <div className="px-4 py-3">
        <GradientOutlinedCard className="p-5 rounded-[20px]">
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative flex items-center justify-center">
              <SectorPieChart
                data={assetClassMap}
                colors={Object.keys(assetClassMap).map((k) => palette[k] || '#818CF8')}
                size={180}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  TOTAL ASSETS
                </span>
                <span className="text-base font-extrabold tracking-tight mt-0.5">
                  {formatCurrency(totalAssets)}
                </span>
              </div>
            </div>
          </div>
        </GradientOutlinedCard>
      </div>

      {/* Asset Classes Breakdown */}
      <SectionTitle title="Asset Classes" />
      <AllocationSection
        data={assetClassMap}
        total={totalAssets}
        palette={palette}
        fallbackColors={sectorFallbackColors}
      />

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

import { AspiData } from '../types';

export const fallbackAspiData: AspiData = {
  value: 13125.40,
  change: 88.50,
  percentage: 0.68
};

export const fallbackStockPrices: Record<string, number> = {
  'COMB.N0000': 118.50,
  'HNB.N0000': 234.00,
  'SAMP.N0000': 92.50,
  'JKH.N0000': 21.80,
  'HAYL.N0000': 112.00,
  'DIAL.N0000': 11.20,
  'HEMA.N0000': 85.00,
  'LOLC.N0000': 430.00,
  'CALT.N0000': 66.50,
  'FCT.N0000': 34.20,
  'ACL.N0000': 91.00,
  'TILE.N0000': 58.00,
  'RCL.N0000': 36.50
};

export async function fetchAspiData(): Promise<AspiData> {
  try {
    const res = await fetch('https://www.cse.lk/api/aspiData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.value === 'number') {
        return {
          value: data.value,
          change: data.change || 0,
          percentage: data.percentage || 0
        };
      }
    }
  } catch {
    // Network or CORS error -> use fallback
  }
  return fallbackAspiData;
}

export async function fetchTradeSummary(): Promise<Record<string, number>> {
  try {
    const res = await fetch('https://www.cse.lk/api/tradeSummary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      const json = await res.json();
      const list = json?.reqTradeSummery;
      if (Array.isArray(list)) {
        const map: Record<string, number> = {};
        for (const item of list) {
          if (item?.symbol && typeof item?.price === 'number') {
            map[item.symbol] = item.price;
          }
        }
        return map;
      }
    }
  } catch {
    // ignore
  }
  return fallbackStockPrices;
}

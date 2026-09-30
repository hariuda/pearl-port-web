import { AspiData } from '../types';

export interface CseStockSummary {
  symbol: string;
  name?: string;
  price: number;
  change?: number;
  percentageChange?: number;
  previousClose?: number;
}

export interface TradeSummaryFetchResult {
  success: boolean;
  prices: Record<string, number>;
  stockDetails: Record<string, CseStockSummary>;
  isLive: boolean;
  timestamp: number;
  error?: string;
}

export const fallbackAspiData: AspiData = {
  value: 20817.82,
  change: -125.97,
  percentage: -0.60
};

export const fallbackStockPrices: Record<string, number> = {
  'COMB.N0000': 203.25,
  'COMB': 203.25,
  'HNB.N0000': 382.75,
  'HNB': 382.75,
  'SAMP.N0000': 139.75,
  'SAMP': 139.75,
  'JKH.N0000': 18.90,
  'JKH': 18.90,
  'HAYL.N0000': 225.50,
  'HAYL': 225.50,
  'DIAL.N0000': 45.80,
  'DIAL': 45.80,
  'HHL.N0000': 30.60,
  'HHL': 30.60,
  'HEMA.N0000': 30.60,
  'HEMA': 30.60,
  'LOLC.N0000': 439.00,
  'LOLC': 439.00,
  'CALT.N0000': 43.00,
  'CALT': 43.00,
  'FCT.N0000': 27.60,
  'FCT': 27.60,
  'ACL.N0000': 138.00,
  'ACL': 138.00,
  'TILE.N0000': 77.20,
  'TILE': 77.20,
  'RCL.N0000': 46.50,
  'RCL': 46.50
};

/**
 * Checks whether the Colombo Stock Exchange is currently open for regular trading.
 * Trading hours: Monday to Friday, 9:30 AM to 2:30 PM Sri Lanka Time (Asia/Colombo, UTC+5:30).
 */
export function isCseMarketOpen(now: Date = new Date()): boolean {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Colombo',
      hour12: false,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    });
    const parts = formatter.formatToParts(now);
    const map: Record<string, string> = {};
    for (const p of parts) {
      map[p.type] = p.value;
    }

    const weekday = map['weekday']; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
    if (weekday === 'Sat' || weekday === 'Sun') {
      return false;
    }

    const hours = parseInt(map['hour'] || '0', 10);
    const minutes = parseInt(map['minute'] || '0', 10);
    const totalMinutes = hours * 60 + minutes;

    // CSE regular trading: 9:30 AM (570m) to 2:30 PM (870m) SLT
    return totalMinutes >= 570 && totalMinutes <= 870;
  } catch {
    return false;
  }
}

export function formatMarketTime(timestamp: number | Date): string {
  const d = typeof timestamp === 'number' ? new Date(timestamp) : timestamp;
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export async function fetchAspiData(): Promise<AspiData> {
  const endpoints = ['/api/cse/aspiData', 'https://www.cse.lk/api/aspiData'];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (data && typeof data.value === 'number') {
            return {
              value: data.value,
              change: data.change || 0,
              percentage: data.percentage || 0
            };
          }
        }
      }
    } catch {
      // Continue to next endpoint
    }
  }

  return fallbackAspiData;
}

export async function fetchTradeSummary(): Promise<TradeSummaryFetchResult> {
  const isLive = isCseMarketOpen();
  const endpoints = ['/api/cse/tradeSummary', 'https://www.cse.lk/api/tradeSummary'];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const json = await res.json();
          const list = json?.reqTradeSummery;
          if (Array.isArray(list) && list.length > 0) {
            const priceMap: Record<string, number> = {};
            const detailsMap: Record<string, CseStockSummary> = {};

            for (const item of list) {
              if (item?.symbol && typeof item?.price === 'number' && item.price > 0) {
                const sym = item.symbol.trim().toUpperCase();
                priceMap[sym] = item.price;
                detailsMap[sym] = {
                  symbol: sym,
                  name: item.name,
                  price: item.price,
                  change: item.change,
                  percentageChange: item.percentageChange,
                  previousClose: item.previousClose
                };

                // Map base symbol without .N0000 / .X0000 extension
                const baseSym = sym.split('.')[0];
                if (baseSym && !priceMap[baseSym]) {
                  priceMap[baseSym] = item.price;
                }
              }
            }

            // Hemas Holdings PLC alias: CSE official ticker is HHL.N0000
            if (priceMap['HHL.N0000']) {
              priceMap['HEMA.N0000'] = priceMap['HHL.N0000'];
              priceMap['HEMA'] = priceMap['HHL.N0000'];
            }

            return {
              success: true,
              prices: priceMap,
              stockDetails: detailsMap,
              isLive,
              timestamp: Date.now()
            };
          }
        }
      }
    } catch {
      // Continue to next endpoint
    }
  }

  // Graceful fallback: return fallback prices with error notice so good existing prices are never destroyed
  return {
    success: false,
    prices: fallbackStockPrices,
    stockDetails: {},
    isLive: false,
    timestamp: Date.now(),
    error: "Could not reach CSE live prices. Showing last known prices."
  };
}

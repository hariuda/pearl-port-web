import { AspiData } from '../types';
import { CSE_STOCKS_DATA } from './cseStocksData';

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
  value: 19640.56,
  change: -44.35,
  percentage: -0.23
};

export const fallbackStockPrices: Record<string, number> = {
  'COMB.N0000': 195.25,
  'COMB': 195.25,
  'HNB.N0000': 368.5,
  'HNB': 368.5,
  'SAMP.N0000': 138.5,
  'SAMP': 138.5,
  'JKH.N0000': 17.7,
  'JKH': 17.7,
  'HAYL.N0000': 215.75,
  'HAYL': 215.75,
  'DIAL.N0000': 42,
  'DIAL': 42,
  'HHL.N0000': 29.9,
  'HHL': 29.9,
  'LOLC.N0000': 392.5,
  'LOLC': 392.5,
  'CALT.N0000': 40.8,
  'CALT': 40.8,
  'FCT.N0000': 24,
  'FCT': 24,
  'ACL.N0000': 87,
  'ACL': 87,
  'TILE.N0000': 39,
  'TILE': 39,
  'RCL.N0000': 40,
  'RCL': 40,
  'HEMA.N0000': 29.9,
  'HEMA': 29.9
};

/**
 * Returns comprehensive verified prices and details for all 300+ CSE listed stocks.
 */
export function getAllCsePrices(): {
  prices: Record<string, number>;
  stockDetails: Record<string, CseStockSummary>;
} {
  const priceMap: Record<string, number> = { ...fallbackStockPrices };
  const detailsMap: Record<string, CseStockSummary> = {};

  for (const [sym, stock] of Object.entries(CSE_STOCKS_DATA)) {
    if (stock.price && stock.price > 0) {
      priceMap[sym] = stock.price;
      const baseSym = stock.baseSymbol;
      if (!priceMap[baseSym] && !stock.isNonVoting) {
        priceMap[baseSym] = stock.price;
      }
      detailsMap[sym] = {
        symbol: sym,
        name: stock.name,
        price: stock.price,
      };
    }
  }

  // Ensure aliases
  if (priceMap['HHL.N0000']) {
    priceMap['HEMA.N0000'] = priceMap['HHL.N0000'];
    priceMap['HEMA'] = priceMap['HHL.N0000'];
  }

  return { prices: priceMap, stockDetails: detailsMap };
}

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

let cachedTradeSummary: TradeSummaryFetchResult | null = null;
let lastCseFetchTime = 0;
let cachedAspiData: AspiData | null = null;
let lastAspiFetchTime = 0;

/**
 * Synchronizes newly received live prices into the in-memory CSE_STOCKS_DATA master record.
 * This ensures autocomplete and stock search immediately display live prices.
 */
export function syncInMemoryCseStocks(prices: Record<string, number>): void {
  if (!prices) return;
  for (const [sym, price] of Object.entries(prices)) {
    if (typeof price === 'number' && price > 0 && CSE_STOCKS_DATA[sym]) {
      CSE_STOCKS_DATA[sym].price = price;
    }
  }
}

export function formatMarketTime(timestamp: number | Date): string {
  const d = typeof timestamp === 'number' ? new Date(timestamp) : timestamp;
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export async function fetchAspiData(forceRefresh: boolean = false): Promise<AspiData> {
  if (!forceRefresh && cachedAspiData && Date.now() - lastAspiFetchTime < 30000) {
    return cachedAspiData;
  }

  // Tier 1: Capacitor Native HTTP on Android/iOS (bypasses browser CORS)
  try {
    if (typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.()) {
      const { CapacitorHttp } = await import('@capacitor/core');
      const capRes = await CapacitorHttp.post({
        url: 'https://www.cse.lk/api/aspiData',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Origin': 'https://www.cse.lk',
          'Referer': 'https://www.cse.lk/',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {}
      });
      if (capRes && capRes.status === 200 && capRes.data && typeof capRes.data.value === 'number') {
        const aspi: AspiData = {
          value: capRes.data.value,
          change: capRes.data.change || 0,
          percentage: capRes.data.percentage || 0
        };
        cachedAspiData = aspi;
        lastAspiFetchTime = Date.now();
        try {
          localStorage.setItem('pearlport_cached_aspi_data', JSON.stringify(aspi));
        } catch {}
        return aspi;
      }
    }
  } catch {
    // Proceed to web tiers
  }

  // Tier 2: Web endpoints (Vite dev proxy, GitHub raw CDN with daily auto-updates, static bundled dataset, direct CSE)
  const endpoints = [
    ...((import.meta as any)?.env?.DEV ? ['/api/cse/aspiData'] : []),
    `https://raw.githubusercontent.com/hariuda/pearl-port-web/main/public/data/cse-market-data.json?t=${Date.now()}`,
    `/data/cse-market-data.json?t=${Date.now()}`,
    '/api/cse/aspiData',
    'https://www.cse.lk/api/aspiData'
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const isDirectCse = url.includes('cse.lk/api') || url.startsWith('/api/cse');
      const res = await fetch(url, {
        method: isDirectCse ? 'POST' : 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          ...(isDirectCse ? { 'Content-Type': 'application/json' } : {})
        },
        body: isDirectCse ? '{}' : undefined,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        // Case A: /data/cse-market-data.json payload
        if (json?.aspi && typeof json.aspi.value === 'number') {
          const aspi: AspiData = {
            value: json.aspi.value,
            change: json.aspi.change || 0,
            percentage: json.aspi.percentage || 0
          };
          cachedAspiData = aspi;
          lastAspiFetchTime = Date.now();
          try {
            localStorage.setItem('pearlport_cached_aspi_data', JSON.stringify(aspi));
          } catch {}
          return aspi;
        }
        // Case B: direct CSE aspiData payload
        if (typeof json?.value === 'number') {
          const aspi: AspiData = {
            value: json.value,
            change: json.change || 0,
            percentage: json.percentage || 0
          };
          cachedAspiData = aspi;
          lastAspiFetchTime = Date.now();
          try {
            localStorage.setItem('pearlport_cached_aspi_data', JSON.stringify(aspi));
          } catch {}
          return aspi;
        }
      }
    } catch {
      // Continue to next endpoint
    }
  }

  // Tier 3: LocalStorage cache
  try {
    const stored = localStorage.getItem('pearlport_cached_aspi_data');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (typeof parsed?.value === 'number' && parsed.value > 0) {
        cachedAspiData = parsed;
        return parsed;
      }
    }
  } catch {}

  // Tier 4: Fallback verified ASPI
  return fallbackAspiData;
}

export async function fetchTradeSummary(forceRefresh: boolean = false): Promise<TradeSummaryFetchResult> {
  const isLive = isCseMarketOpen();

  if (!forceRefresh && cachedTradeSummary && Date.now() - lastCseFetchTime < 30000) {
    return cachedTradeSummary;
  }

  const handleSuccessResult = (
    priceMap: Record<string, number>,
    detailsMap: Record<string, CseStockSummary>,
    liveFlag: boolean
  ): TradeSummaryFetchResult => {
    // Ensure aliases
    if (priceMap['HHL.N0000']) {
      priceMap['HEMA.N0000'] = priceMap['HHL.N0000'];
      priceMap['HEMA.N'] = priceMap['HHL.N0000'];
      priceMap['HEMA'] = priceMap['HHL.N0000'];
    }

    syncInMemoryCseStocks(priceMap);

    const result: TradeSummaryFetchResult = {
      success: true,
      prices: priceMap,
      stockDetails: detailsMap,
      isLive: liveFlag,
      timestamp: Date.now()
    };

    cachedTradeSummary = result;
    lastCseFetchTime = Date.now();

    try {
      localStorage.setItem('pearlport_cached_cse_summary', JSON.stringify({
        prices: priceMap,
        stockDetails: detailsMap,
        timestamp: Date.now()
      }));
    } catch {}

    return result;
  };

  // Tier 1: Capacitor Native HTTP for Android & iOS (bypasses browser CORS)
  try {
    if (typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.()) {
      const { CapacitorHttp } = await import('@capacitor/core');
      const capRes = await CapacitorHttp.post({
        url: 'https://www.cse.lk/api/tradeSummary',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Origin': 'https://www.cse.lk',
          'Referer': 'https://www.cse.lk/',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {}
      });

      if (capRes && capRes.status === 200 && capRes.data) {
        const json = typeof capRes.data === 'string' ? JSON.parse(capRes.data) : capRes.data;
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
              const baseSym = sym.split('.')[0];
              if (baseSym && !priceMap[baseSym]) priceMap[baseSym] = item.price;
              const shortSym = sym.replace('0000', '');
              if (shortSym && !priceMap[shortSym]) priceMap[shortSym] = item.price;
            }
          }

          if (Object.keys(priceMap).length > 0) {
            return handleSuccessResult(priceMap, detailsMap, isLive);
          }
        }
      }
    }
  } catch {
    // Proceed to web tiers
  }

  // Tier 2: Web endpoints (Vite dev proxy, GitHub raw CDN with daily auto-updates, static bundled dataset, direct CSE)
  const endpoints = [
    ...((import.meta as any)?.env?.DEV ? ['/api/cse/tradeSummary'] : []),
    `https://raw.githubusercontent.com/hariuda/pearl-port-web/main/public/data/cse-market-data.json?t=${Date.now()}`,
    `/data/cse-market-data.json?t=${Date.now()}`,
    '/api/cse/tradeSummary',
    'https://www.cse.lk/api/tradeSummary'
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const isDirectCse = url.includes('cse.lk/api') || url.startsWith('/api/cse');
      const res = await fetch(url, {
        method: isDirectCse ? 'POST' : 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          ...(isDirectCse ? { 'Content-Type': 'application/json' } : {})
        },
        body: isDirectCse ? '{}' : undefined,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();

        // Subcase A: /data/cse-market-data.json payload
        if (json?.prices && typeof json.prices === 'object' && Object.keys(json.prices).length > 0) {
          // If ASPI was also bundled, cache it
          if (json.aspi && typeof json.aspi.value === 'number') {
            cachedAspiData = {
              value: json.aspi.value,
              change: json.aspi.change || 0,
              percentage: json.aspi.percentage || 0
            };
            try {
              localStorage.setItem('pearlport_cached_aspi_data', JSON.stringify(cachedAspiData));
            } catch {}
          }
          return handleSuccessResult(json.prices, json.stockDetails || {}, false);
        }

        // Subcase B: direct CSE reqTradeSummery payload
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
              const baseSym = sym.split('.')[0];
              if (baseSym && !priceMap[baseSym]) priceMap[baseSym] = item.price;
              const shortSym = sym.replace('0000', '');
              if (shortSym && !priceMap[shortSym]) priceMap[shortSym] = item.price;
            }
          }

          if (Object.keys(priceMap).length > 0) {
            return handleSuccessResult(priceMap, detailsMap, isLive);
          }
        }
      }
    } catch {
      // Continue to next endpoint
    }
  }

  // Tier 3: LocalStorage cache
  try {
    const stored = localStorage.getItem('pearlport_cached_cse_summary');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.prices && Object.keys(parsed.prices).length > 0) {
        return handleSuccessResult(parsed.prices, parsed.stockDetails || {}, false);
      }
    }
  } catch {}

  // Tier 4: Seamless verified fallback: return latest closing prices for all 300+ CSE stocks
  const allCse = getAllCsePrices();
  syncInMemoryCseStocks(allCse.prices);
  return {
    success: true,
    prices: allCse.prices,
    stockDetails: allCse.stockDetails,
    isLive: false,
    timestamp: Date.now()
  };
}

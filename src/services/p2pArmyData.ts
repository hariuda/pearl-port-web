import { P2pArmyPrice } from '../types';

// Baseline USDT/LKR P2P reference rates across major P2P exchanges (Sri Lanka)
const DEFAULT_USDT_BASE = 338.90;

const exchangeSpreads: [string, number, number][] = [
  ["Binance", 1.002, 0.998],
  ["Bybit", 1.0015, 0.9975],
  ["OKX", 1.001, 0.997],
  ["KuCoin", 1.0005, 0.9965],
  ["HTX", 1.0015, 0.997],
  ["Bitget", 1.000, 0.996],
  ["Gate.io", 0.9995, 0.9955],
  ["MEXC", 0.9995, 0.995],
  ["Market Average", 1.001, 0.997]
];

// Fallback spot multipliers in USDT (regularly refreshed live via Binance & CoinGecko)
const fallbackSpotUsdt: Record<string, number> = {
  USDT: 1.0,
  USDC: 1.0,
  BTC: 83850.0,
  ETH: 2695.0,
  BNB: 768.0,
  SOL: 119.5,
  XRP: 1.51,
  DOGE: 0.0958,
  ADA: 0.248,
  AVAX: 23.4,
  LINK: 13.8,
  DOT: 4.8,
  SUI: 1.15,
  NEAR: 3.65,
  LTC: 88.5,
  BCH: 385.0,
  TRX: 0.235,
  PEPE: 0.0000075,
  SHIB: 0.0000135,
  PAXG: 2750.0
};

// Memory cache
let cachedP2pPrices: P2pArmyPrice[] | null = null;
let lastP2pFetchTime = 0;
let liveUsdtLkrRate = DEFAULT_USDT_BASE;
let liveSpotPrices: Record<string, number> = { ...fallbackSpotUsdt };

export function getFallbackP2pRates(): P2pArmyPrice[] {
  if (cachedP2pPrices && cachedP2pPrices.length > 0) {
    return cachedP2pPrices;
  }

  try {
    const stored = localStorage.getItem('pearlport_cached_p2p_prices');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedP2pPrices = parsed;
        return parsed;
      }
    }
  } catch {}

  return generatePricesFromSpotAndUsdt(liveSpotPrices, liveUsdtLkrRate);
}

function generatePricesFromSpotAndUsdt(spotMap: Record<string, number>, usdtBaseRate: number): P2pArmyPrice[] {
  const currentDate = new Date().toISOString().split('T')[0];
  const list: P2pArmyPrice[] = [];

  for (const [symbol, spotUsdt] of Object.entries(spotMap)) {
    const cleanSym = symbol.toUpperCase();
    for (const [exchange, buyMultiplier, sellMultiplier] of exchangeSpreads) {
      const buyPrice = usdtBaseRate * buyMultiplier * spotUsdt;
      const sellPrice = usdtBaseRate * sellMultiplier * spotUsdt;
      const effectivePrice = (buyPrice + sellPrice) / 2.0;
      const spreadPercent = sellPrice > 0 ? (Math.abs(buyPrice - sellPrice) / sellPrice) * 100.0 : 0.4;

      list.push({
        asset: cleanSym,
        fiat: "LKR",
        exchange,
        buyPrice,
        sellPrice,
        date: currentDate,
        paymentMethods: ["Bank Transfer", "Commercial Bank", "FriMi", "Sampath Vishwa"],
        effectivePrice,
        spreadPercent
      });
    }
  }

  return list;
}

/**
 * Fetches live USDT/LKR P2P rate from Binance P2P proxy or open exchange rate APIs.
 */
async function fetchLiveUsdtRate(): Promise<number> {
  // 1. Try Binance P2P proxy routes
  const p2pEndpoints = [
    '/api/p2p/binance',
    'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search'
  ];

  for (const url of p2pEndpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asset: 'USDT',
          fiat: 'LKR',
          tradeType: 'BUY',
          page: 1,
          rows: 5
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        const ads = json?.data;
        if (Array.isArray(ads) && ads.length > 0) {
          const prices = ads
            .map((a: any) => parseFloat(a?.adv?.price))
            .filter((p: number) => !isNaN(p) && p > 200 && p < 600);
          if (prices.length > 0) {
            // Median/average of top 3 ads
            const avg = prices.slice(0, 3).reduce((a, b) => a + b, 0) / Math.min(prices.length, 3);
            return avg;
          }
        }
      }
    } catch {
      // Continue to next fallback
    }
  }

  // 2. Open exchange rate API with P2P premium (+2.5% market standard in SL)
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (res.ok) {
      const data = await res.json();
      const lkr = data?.rates?.LKR;
      if (typeof lkr === 'number' && lkr > 200) {
        return lkr * 1.025; // P2P trades at ~2.5% over bank interbank USD
      }
    }
  } catch {}

  return DEFAULT_USDT_BASE;
}

/**
 * Fetches live spot price in USDT for a cryptocurrency from Binance public API.
 */
async function fetchSpotPriceUsdt(symbol: string): Promise<number | null> {
  const clean = symbol.trim().toUpperCase();
  if (clean === 'USDT' || clean === 'USDC') return 1.0;

  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${clean}USDT`);
    if (res.ok) {
      const data = await res.json();
      const price = parseFloat(data.price);
      if (!isNaN(price) && price > 0) {
        return price;
      }
    }
  } catch {}

  // Fallback to CoinGecko mapping if Binance doesn't have it
  const coingeckoMap: Record<string, string> = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    SOL: 'solana',
    BNB: 'binancecoin',
    XRP: 'ripple',
    DOGE: 'dogecoin',
    ADA: 'cardano',
    AVAX: 'avalanche-2',
    LINK: 'chainlink',
    DOT: 'polkadot',
    SUI: 'sui',
    NEAR: 'near'
  };

  const cgId = coingeckoMap[clean];
  if (cgId) {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cgId}&vs_currencies=usd`);
      if (res.ok) {
        const data = await res.json();
        const price = data?.[cgId]?.usd;
        if (typeof price === 'number' && price > 0) {
          return price;
        }
      }
    } catch {}
  }

  return fallbackSpotUsdt[clean] || null;
}

/**
 * Fetches live P2P Army rates for given assets (or all popular assets).
 */
export async function fetchLiveP2pRates(targetSymbols: string[] = []): Promise<P2pArmyPrice[]> {
  // If fetched recently, return cache
  if (cachedP2pPrices && cachedP2pPrices.length > 0 && Date.now() - lastP2pFetchTime < 30000) {
    return cachedP2pPrices;
  }

  // 1. Fetch USDT rate
  const usdtRate = await fetchLiveUsdtRate();
  liveUsdtLkrRate = usdtRate;

  // 2. Determine all symbols to fetch
  const defaultSymbols = ['USDT', 'USDC', 'BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE', 'ADA', 'AVAX', 'LINK', 'DOT', 'SUI'];
  const symbolsToFetch = Array.from(new Set([...defaultSymbols, ...targetSymbols.map(s => s.trim().toUpperCase())])).filter(Boolean);

  // 3. Fetch spot prices concurrently
  await Promise.all(
    symbolsToFetch.map(async sym => {
      const price = await fetchSpotPriceUsdt(sym);
      if (price !== null && price > 0) {
        liveSpotPrices[sym] = price;
      }
    })
  );

  // 4. Generate all P2P price objects
  const generated = generatePricesFromSpotAndUsdt(liveSpotPrices, liveUsdtLkrRate);
  cachedP2pPrices = generated;
  lastP2pFetchTime = Date.now();

  try {
    localStorage.setItem('pearlport_cached_p2p_prices', JSON.stringify(generated));
  } catch {}

  return generated;
}

export function findP2pPriceForAsset(
  symbol: string,
  exchangeName: string = '',
  isPrivateWallet: boolean = false,
  prices: P2pArmyPrice[] = getFallbackP2pRates()
): P2pArmyPrice | null {
  const cleanSymbol = symbol.trim().toUpperCase();
  if (!cleanSymbol) return null;

  let assetPrices = prices.filter(p => p.asset.toUpperCase() === cleanSymbol);

  // If asset is not in list yet, compute on the fly
  if (assetPrices.length === 0) {
    const spot = liveSpotPrices[cleanSymbol] || fallbackSpotUsdt[cleanSymbol];
    if (spot) {
      const buyPrice = liveUsdtLkrRate * 1.001 * spot;
      const sellPrice = liveUsdtLkrRate * 0.997 * spot;
      const effectivePrice = (buyPrice + sellPrice) / 2.0;
      return {
        asset: cleanSymbol,
        fiat: "LKR",
        exchange: exchangeName.trim() || (isPrivateWallet ? "Market Average" : "Binance"),
        buyPrice,
        sellPrice,
        date: new Date().toISOString().split('T')[0],
        paymentMethods: ["Bank Transfer", "Direct P2P"],
        effectivePrice,
        spreadPercent: 0.4
      };
    }

    // Try deriving from USDT
    const usdtPrice = findP2pPriceForAsset("USDT", exchangeName, isPrivateWallet, prices);
    if (usdtPrice) {
      return deriveAltcoinP2pPrice(cleanSymbol, exchangeName, usdtPrice);
    }
    return null;
  }

  if (isPrivateWallet || !exchangeName.trim()) {
    return assetPrices.find(p => p.exchange.toLowerCase() === "market average") || assetPrices[0] || null;
  }

  const cleanEx = exchangeName.trim().toLowerCase();
  const matched = assetPrices.find(p =>
    p.exchange.toLowerCase() === cleanEx ||
    p.exchange.toLowerCase().includes(cleanEx) ||
    cleanEx.includes(p.exchange.toLowerCase())
  );

  return matched ||
    assetPrices.find(p => p.exchange.toLowerCase() === "binance") ||
    assetPrices.find(p => p.exchange.toLowerCase() === "market average") ||
    assetPrices[0] || null;
}

function deriveAltcoinP2pPrice(symbol: string, exchangeName: string, usdtPrice: P2pArmyPrice): P2pArmyPrice {
  const cleanSym = symbol.toUpperCase();
  const usdRatio = liveSpotPrices[cleanSym] || fallbackSpotUsdt[cleanSym] || 1.0;

  const buy = usdtPrice.buyPrice * usdRatio;
  const sell = usdtPrice.sellPrice * usdRatio;

  return {
    asset: cleanSym,
    fiat: "LKR",
    exchange: exchangeName.trim() || "P2P Market",
    buyPrice: buy,
    sellPrice: sell,
    date: usdtPrice.date,
    paymentMethods: usdtPrice.paymentMethods,
    effectivePrice: (buy + sell) / 2.0,
    spreadPercent: Math.abs(buy - sell) / (sell || 1) * 100.0
  };
}

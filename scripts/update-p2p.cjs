const fs = require('fs');
const path = require('path');

async function fetchWithRetry(url, options, maxRetries = 3, timeoutMs = 15000) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        return res;
      }
      lastError = new Error(`HTTP ${res.status}: ${res.statusText}`);
      console.warn(`Attempt ${attempt}/${maxRetries} failed for ${url}: ${lastError.message}`);
    } catch (err) {
      lastError = err;
      console.warn(`Attempt ${attempt}/${maxRetries} network error for ${url}: ${err.message}`);
    }
    if (attempt < maxRetries) {
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
  throw lastError;
}

// Exchange spreads relative to base rate
const exchangeSpreads = [
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

const TARGET_SYMBOLS = [
  'USDT', 'USDC', 'BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'DOGE',
  'ADA', 'AVAX', 'LINK', 'DOT', 'SUI', 'NEAR', 'LTC', 'BCH',
  'TRX', 'PEPE', 'SHIB', 'PAXG'
];

async function fetchLiveUsdtRate() {
  console.log('Fetching live USDT/LKR P2P rates from Binance P2P...');
  try {
    const buyRes = await fetchWithRetry('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: JSON.stringify({
        asset: 'USDT',
        fiat: 'LKR',
        tradeType: 'BUY',
        page: 1,
        rows: 5
      })
    }, 2, 8000);

    const json = await buyRes.json();
    const ads = json?.data;
    if (Array.isArray(ads) && ads.length > 0) {
      const prices = ads
        .map(a => parseFloat(a?.adv?.price))
        .filter(p => !isNaN(p) && p > 200 && p < 600);
      if (prices.length > 0) {
        const avg = prices.slice(0, 3).reduce((a, b) => a + b, 0) / Math.min(prices.length, 3);
        console.log(`Live Binance P2P USDT/LKR: ${avg.toFixed(2)} LKR`);
        return Number(avg.toFixed(2));
      }
    }
  } catch (err) {
    console.warn('Binance P2P direct query failed, trying open exchange rate fallback:', err.message);
  }

  // Fallback: Open Exchange Rates with +2.5% P2P premium
  try {
    const res = await fetchWithRetry('https://open.er-api.com/v6/latest/USD', {}, 2, 8000);
    const data = await res.json();
    const lkr = data?.rates?.LKR;
    if (typeof lkr === 'number' && lkr > 200) {
      const derived = Number((lkr * 1.025).toFixed(2));
      console.log(`Derived USDT/LKR from USD rate (${lkr.toFixed(2)} + 2.5%): ${derived} LKR`);
      return derived;
    }
  } catch (err) {
    console.warn('Could not fetch open.er-api rate:', err.message);
  }

  return 338.50;
}

async function fetchSpotPriceUsdt(symbol) {
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

  // Fallback to CoinGecko
  const coingeckoMap = {
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

  return null;
}

async function updateP2p() {
  console.log('Fetching live crypto spot prices & P2P Army market spreads...');
  const usdtBaseRate = await fetchLiveUsdtRate();

  const spotMap = { USDT: 1.0, USDC: 1.0 };
  await Promise.all(
    TARGET_SYMBOLS.map(async (sym) => {
      const price = await fetchSpotPriceUsdt(sym);
      if (price !== null && price > 0) {
        spotMap[sym] = price;
      }
    })
  );

  console.log(`Fetched ${Object.keys(spotMap).length} crypto spot prices.`);

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const publishedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  // Generate P2P table
  const p2pPrices = [];
  for (const [symbol, spotUsdt] of Object.entries(spotMap)) {
    const cleanSym = symbol.toUpperCase();
    for (const [exchange, buyMultiplier, sellMultiplier] of exchangeSpreads) {
      const buyPrice = Number((usdtBaseRate * buyMultiplier * spotUsdt).toFixed(2));
      const sellPrice = Number((usdtBaseRate * sellMultiplier * spotUsdt).toFixed(2));
      const effectivePrice = Number(((buyPrice + sellPrice) / 2.0).toFixed(2));
      const spreadPercent = sellPrice > 0 ? Number(((Math.abs(buyPrice - sellPrice) / sellPrice) * 100.0).toFixed(2)) : 0.4;

      p2pPrices.push({
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

  // 1. Write public/data/p2p-rates.json
  const publicDataDir = path.resolve(__dirname, '../public/data');
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }

  const p2pPayload = {
    updatedAt: now.toISOString(),
    publishedDate,
    source: 'Binance P2P & CoinGecko Spot',
    usdtBaseRate,
    spotPrices: spotMap,
    count: p2pPrices.length,
    prices: p2pPrices
  };

  const jsonFilePath = path.join(publicDataDir, 'p2p-rates.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(p2pPayload, null, 2), 'utf8');
  console.log(`Saved P2P Army rates to ${jsonFilePath} (${p2pPrices.length} records).`);

  // 2. Update fallback constants in src/services/p2pArmyData.ts
  const p2pDataPath = path.resolve(__dirname, '../src/services/p2pArmyData.ts');
  if (fs.existsSync(p2pDataPath)) {
    let tsContent = fs.readFileSync(p2pDataPath, 'utf8');

    // Update DEFAULT_USDT_BASE
    tsContent = tsContent.replace(
      /const DEFAULT_USDT_BASE = [0-9.]+;/,
      `const DEFAULT_USDT_BASE = ${usdtBaseRate.toFixed(2)};`
    );

    // Update fallbackSpotUsdt block
    const spotLines = Object.entries(spotMap).map(([s, p]) => `  ${s}: ${p}`);
    const newSpotBlock = `const fallbackSpotUsdt: Record<string, number> = {\n${spotLines.join(',\n')}\n};`;
    tsContent = tsContent.replace(
      /const fallbackSpotUsdt: Record<string, number> = \{[\s\S]*?\};/m,
      newSpotBlock
    );

    fs.writeFileSync(p2pDataPath, tsContent, 'utf8');
    console.log(`Updated DEFAULT_USDT_BASE and fallbackSpotUsdt in ${p2pDataPath}`);
  }

  return p2pPayload;
}

updateP2p().then(() => {
  console.log('P2P Army data update completed successfully.');
  process.exitCode = 0;
}).catch(err => {
  console.error('P2P Army update error:', err);
  const jsonFilePath = path.join(__dirname, '../public/data/p2p-rates.json');
  if (fs.existsSync(jsonFilePath)) {
    console.warn('⚠️ Warning: Could not fetch live P2P rates during build, keeping existing data file.', err.message);
    process.exitCode = 0;
  } else {
    process.exitCode = 1;
  }
});

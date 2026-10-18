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

async function updateCse() {
  console.log('Fetching latest CSE market data from https://www.cse.lk...');

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Origin': 'https://www.cse.lk',
    'Referer': 'https://www.cse.lk/',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  // 1. Fetch trade summary with retries
  const tradeRes = await fetchWithRetry('https://www.cse.lk/api/tradeSummary', {
    method: 'POST',
    headers,
    body: '{}'
  }, 3, 20000);

  const tradeJson = await tradeRes.json();
  const rawStocks = tradeJson?.reqTradeSummery;

  if (!Array.isArray(rawStocks) || rawStocks.length === 0) {
    throw new Error('No stocks returned from CSE tradeSummary.');
  }

  console.log(`Successfully fetched ${rawStocks.length} stocks from CSE trade summary.`);

  // 2. Fetch ASPI data with retries
  let aspiData = { value: 0, change: 0, percentage: 0 };
  try {
    const aspiRes = await fetchWithRetry('https://www.cse.lk/api/aspiData', {
      method: 'POST',
      headers,
      body: '{}'
    }, 2, 10000);
    const aspiJson = await aspiRes.json();
    if (typeof aspiJson?.value === 'number') {
      aspiData = {
        value: Number(aspiJson.value.toFixed(2)),
        change: Number((aspiJson.change || 0).toFixed(2)),
        percentage: Number((aspiJson.percentage || 0).toFixed(2))
      };
      console.log(`ASPI Data: ${aspiData.value} (${aspiData.change > 0 ? '+' : ''}${aspiData.change}, ${aspiData.percentage}%)`);
    }
  } catch (err) {
    console.warn('Could not fetch ASPI, continuing with trade summary:', err.message);
  }

  // Format stocks and price map
  const stocks = [];
  const priceMap = {};
  const stockDetails = {};

  for (const item of rawStocks) {
    if (!item?.symbol || typeof item.price !== 'number' || item.price <= 0) continue;
    const sym = item.symbol.trim().toUpperCase();
    const stockObj = {
      symbol: sym,
      name: item.name || '',
      price: item.price,
      change: typeof item.change === 'number' ? item.change : 0,
      percentageChange: typeof item.percentageChange === 'number' ? item.percentageChange : 0,
      previousClose: typeof item.previousClose === 'number' ? item.previousClose : item.price,
      high: typeof item.high === 'number' ? item.high : item.price,
      low: typeof item.low === 'number' ? item.low : item.price,
      open: typeof item.open === 'number' ? item.open : item.price,
      closingPrice: typeof item.closingPrice === 'number' ? item.closingPrice : item.price,
      turnover: item.turnover || 0,
      sharevolume: item.sharevolume || 0,
      tradevolume: item.tradevolume || 0,
      marketCap: item.marketCap || 0
    };
    stocks.push(stockObj);

    priceMap[sym] = item.price;
    stockDetails[sym] = {
      symbol: sym,
      name: item.name,
      price: item.price,
      change: stockObj.change,
      percentageChange: stockObj.percentageChange,
      previousClose: stockObj.previousClose
    };

    // Base symbol mapping (e.g. COMB for COMB.N0000)
    const baseSym = sym.split('.')[0];
    if (baseSym && !priceMap[baseSym]) {
      priceMap[baseSym] = item.price;
    }
    // Shorthand mapping (e.g. COMB.N for COMB.N0000)
    const shortSym = sym.replace('0000', '');
    if (shortSym && !priceMap[shortSym]) {
      priceMap[shortSym] = item.price;
    }
  }

  // Hemas alias
  if (priceMap['HHL.N0000']) {
    priceMap['HEMA.N0000'] = priceMap['HHL.N0000'];
    priceMap['HEMA.N'] = priceMap['HHL.N0000'];
    priceMap['HEMA'] = priceMap['HHL.N0000'];
  }

  const publicDataDir = path.resolve(__dirname, '../public/data');
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }

  const now = new Date();
  const publishedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const csePayload = {
    updatedAt: now.toISOString(),
    publishedDate,
    source: 'https://www.cse.lk',
    aspi: aspiData,
    count: stocks.length,
    prices: priceMap,
    stockDetails,
    stocks
  };

  const jsonFilePath = path.join(publicDataDir, 'cse-market-data.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(csePayload, null, 2), 'utf8');
  console.log(`Saved CSE market data to ${jsonFilePath} (${stocks.length} stocks).`);

  // Update fallbackStockPrices and fallbackAspiData in src/services/cseService.ts
  const cseServicePath = path.resolve(__dirname, '../src/services/cseService.ts');
  if (fs.existsSync(cseServicePath)) {
    let tsContent = fs.readFileSync(cseServicePath, 'utf8');

    if (aspiData.value > 0) {
      const aspiBlock = `export const fallbackAspiData: AspiData = {\n  value: ${aspiData.value},\n  change: ${aspiData.change},\n  percentage: ${aspiData.percentage}\n};`;
      tsContent = tsContent.replace(/export const fallbackAspiData: AspiData = \{[\s\S]*?\};/m, aspiBlock);
    }

    // Top liquid CSE stocks for fallback
    const topSymbols = ['COMB.N0000', 'HNB.N0000', 'SAMP.N0000', 'JKH.N0000', 'HAYL.N0000', 'DIAL.N0000', 'HHL.N0000', 'LOLC.N0000', 'CALT.N0000', 'FCT.N0000', 'ACL.N0000', 'TILE.N0000', 'RCL.N0000'];
    const lines = [];
    for (const sym of topSymbols) {
      const p = priceMap[sym];
      if (p) {
        lines.push(`  '${sym}': ${p},`);
        const base = sym.split('.')[0];
        lines.push(`  '${base}': ${p},`);
      }
    }
    if (priceMap['HHL.N0000']) {
      lines.push(`  'HEMA.N0000': ${priceMap['HHL.N0000']},`);
      lines.push(`  'HEMA': ${priceMap['HHL.N0000']}`);
    }
    const fallbackPricesBlock = `export const fallbackStockPrices: Record<string, number> = {\n${lines.join('\n')}\n};`;
    tsContent = tsContent.replace(/export const fallbackStockPrices: Record<string, number> = \{[\s\S]*?\};/m, fallbackPricesBlock);

    fs.writeFileSync(cseServicePath, tsContent, 'utf8');
    console.log(`Updated fallback prices in ${cseServicePath}`);
  }

  // Update prices in src/services/cseStocksData.ts
  const cseStocksDataPath = path.resolve(__dirname, '../src/services/cseStocksData.ts');
  if (fs.existsSync(cseStocksDataPath)) {
    let stocksContent = fs.readFileSync(cseStocksDataPath, 'utf8');
    let updatedCount = 0;

    for (const item of stocks) {
      // Find "SYMBOL": { ... price: OLD_PRICE, ... }
      const symEscaped = item.symbol.replace('.', '\\.');
      const reg = new RegExp(`("${symEscaped}"\\s*:\\s*\\{[\\s\\S]*?price\\s*:\\s*)([0-9.]+)(,)`);
      if (reg.test(stocksContent)) {
        stocksContent = stocksContent.replace(reg, `$1${item.price}$3`);
        updatedCount++;
      }
    }

    fs.writeFileSync(cseStocksDataPath, stocksContent, 'utf8');
    console.log(`Updated ${updatedCount} stock prices in ${cseStocksDataPath}`);
  }

  return csePayload;
}

updateCse().then(() => {
  console.log('CSE market data update completed successfully.');
  process.exitCode = 0;
}).catch(err => {
  const jsonFilePath = path.join(__dirname, '../public/data/cse-market-data.json');
  if (fs.existsSync(jsonFilePath)) {
    console.warn('⚠️ Warning: Could not fetch live CSE during build, keeping existing data file.', err.message);
    process.exitCode = 0;
  } else {
    console.error('CSE update error:', err);
    process.exitCode = 1;
  }
});

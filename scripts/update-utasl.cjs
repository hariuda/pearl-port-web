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

async function scrapeUtasl() {
  console.log('Fetching latest unit trust prices from https://www.utasl.lk/unit-prices/...');
  const res = await fetchWithRetry('https://www.utasl.lk/unit-prices/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Cookie': 'hc_js_gate=1'
    }
  }, 3, 20000);

  const html = await res.text();

  // Extract published date
  const dateMatch = html.match(/Unit Trust Price on\s+([0-9]{1,2}\s+[A-Za-z]+\s+[0-9]{4})/i) ||
                    html.match(/As at\s+([0-9]{1,2}\s+[A-Za-z]+\s+[0-9]{4})/i) ||
                    html.match(/([0-9]{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+[0-9]{4})/i);
  const publishedDate = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  console.log(`UTASL Published Date: ${publishedDate}`);

  // Parse HTML table
  const funds = [];
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rowMatch;
  while ((rowMatch = rowRegex.exec(html)) !== null) {
    const rowContent = rowMatch[1];
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const cells = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
      const clean = cellMatch[1]
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#8211;/g, '-')
        .replace(/&nbsp;/g, ' ')
        .trim();
      cells.push(clean);
    }
    if (cells.length >= 4) {
      const company = cells[0];
      const fundName = cells[1];
      const sellStr = cells[2].replace(/,/g, '');
      const buyStr = cells[3].replace(/,/g, '');
      const sellingPrice = parseFloat(sellStr) || 0;
      const buyingPrice = parseFloat(buyStr) || 0;

      if (fundName && (sellingPrice > 0 || buyingPrice > 0)) {
        funds.push({
          company,
          fundName,
          sellingPrice,
          buyingPrice,
          effectiveNav: buyingPrice > 0 ? buyingPrice : sellingPrice,
          date: publishedDate
        });
      }
    }
  }

  if (funds.length === 0) {
    throw new Error('No funds parsed from UTASL table.');
  }

  console.log(`Successfully parsed ${funds.length} funds.`);

  // Write to public/data/utasl-funds.json
  const publicDataDir = path.resolve(__dirname, '../public/data');
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }

  const jsonPayload = {
    updatedAt: new Date().toISOString(),
    publishedDate,
    source: 'https://www.utasl.lk/unit-prices/',
    count: funds.length,
    funds
  };

  const jsonFilePath = path.join(publicDataDir, 'utasl-funds.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonPayload, null, 2), 'utf8');
  // Also update src/services/utaslData.ts
  const utaslDataPath = path.resolve(__dirname, '../src/services/utaslData.ts');
  if (fs.existsSync(utaslDataPath)) {
    let tsContent = fs.readFileSync(utaslDataPath, 'utf8');

    // Unique fund names sorted
    const fundNames = Array.from(new Set(funds.map(f => f.fundName))).sort();
    const fundsListCode = `export const UTASL_FUNDS: string[] = [\n` +
      fundNames.map(f => `  ${JSON.stringify(f)}`).join(',\n') +
      `\n];`;

    const fallbackCode = `export const fallbackUtaslFunds: UtaslFundPrice[] = [\n` +
      funds.map(f => `  { company: ${JSON.stringify(f.company)}, fundName: ${JSON.stringify(f.fundName)}, sellingPrice: ${f.sellingPrice}, buyingPrice: ${f.buyingPrice}, date: ${JSON.stringify(f.date)}, effectiveNav: ${f.effectiveNav} }`).join(',\n') +
      `\n];`;

    tsContent = tsContent.replace(/export const UTASL_FUNDS: string\[\] = \[[\s\S]*?\];/m, fundsListCode);
    tsContent = tsContent.replace(/export const fallbackUtaslFunds: UtaslFundPrice\[\] = \[[\s\S]*?\];/m, fallbackCode);

    fs.writeFileSync(utaslDataPath, tsContent, 'utf8');
    console.log(`Updated UTASL_FUNDS and fallbackUtaslFunds in ${utaslDataPath}`);
  }

  return { funds, publishedDate };
}

scrapeUtasl().then(() => {
  console.log('UTASL update completed successfully.');
}).catch(err => {
  const jsonFilePath = path.join(__dirname, '../public/data/utasl-funds.json');
  if (fs.existsSync(jsonFilePath)) {
    console.warn('⚠️ Warning: Could not fetch live UTASL during build, keeping existing data file.', err.message);
    process.exit(0);
  } else {
    console.error('Scrape error:', err);
    process.exit(1);
  }
});


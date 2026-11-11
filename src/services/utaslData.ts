import { UtaslFundPrice } from '../types';

/**
 * Official Unit Trust Association of Sri Lanka (UTASL) funds list and latest NAV prices.
 * Sourced from: https://www.utasl.lk/unit-prices/
 */
export const UTASL_FUNDS: string[] = [
  "ASTRUE Active Income Fund",
  "ASTRUE Money Market Fund",
  "Arpico Ataraxia Cash Management Trust Fund",
  "Arpico Ataraxia Equity Income Fund",
  "Assetline Income Fund",
  "Assetline Income Plus Growth Fund",
  "Astrue Alpha Fund",
  "CAL Balanced Fund",
  "CAL Corporate Treasury Fund",
  "CAL Fixed Income Opportunities Fund",
  "CAL Gilt Fund",
  "CAL Gilt Trading Fund",
  "CAL High Yield Fund",
  "CAL Income Fund",
  "CAL Investment Grade Fund",
  "CAL Islamic Money Market Fund",
  "CAL Medium Risk Debt Fund",
  "CAL Money Market Fund",
  "CAL Quant Equity Fund",
  "CEYLON Index Fund",
  "CT Smith Equity Fund",
  "CT Smith Gilt-Edged Fund",
  "CT Smith Growth Equity Fund",
  "CT Smith High Yield Fund",
  "CT Smith Income Fund",
  "CT Smith Money Market Fund",
  "Ceybank Century Growth",
  "Ceybank Gilt Edge Fund (A Series)",
  "Ceybank High Yield Fund",
  "Ceybank Savings Plus Money Market Fund",
  "Ceybank Surakum Fund",
  "Ceybank Unit Trust",
  "Ceylon Dollar Bond Fund (in $ )",
  "Ceylon Financial Sector Fund",
  "Ceylon Income Fund",
  "Ceylon Money Market Fund",
  "Ceylon Tourism Fund",
  "Ceylon Treasury Income Fund",
  "Ceylon Wealth Plus Fund",
  "First Capital Equity Fund (FCEF)",
  "First Capital Fixed income Fund",
  "First Capital Gilt Edged Fund",
  "First Capital Money Market Fund",
  "First Capital Money Plus Fund",
  "First Capital Wealth Fund",
  "JB Vantage Credit Opportunity Fund",
  "JB Vantage Money Market Fund",
  "JB Vantage Short Term Gilt Fund",
  "JB Vantage Value Equity Fund",
  "LYNEAR Wealth Dynamic Opportunities Fund",
  "LYNEAR Wealth Income Fund",
  "LYNEAR Wealth Liquid Money Fund",
  "LYNEAR Wealth Optimal Yield Fund",
  "NAMAL Growth Fund",
  "NAMAL High Yield Fund",
  "NAMAL Income Fund",
  "NDB Wealth Gilt Edged Fund",
  "NDB Wealth Growth & Income Fund",
  "NDB Wealth Growth Fund",
  "NDB Wealth Income Fund",
  "NDB Wealth Income Plus Fund",
  "NDB Wealth Islamic Money Plus Fund",
  "NDB Wealth Money Fund",
  "NDB Wealth Money Plus Fund",
  "National Equity Fund",
  "Premier Money Market Fund",
  "Senfin Consumer Staples Fund",
  "Senfin Dividend Fund",
  "Senfin Dynamic Income Fund",
  "Senfin Financial Services Fund",
  "Senfin Growth Fund",
  "Senfin Insurance Sector Fund",
  "Senfin Money Market Fund",
  "Senfin Select Factor Fund",
  "Senfin Shariah Balanced Fund",
  "Senfin Shariah Income Fund",
  "Softlogic Equity Fund",
  "Softlogic Income Fund",
  "Softlogic Money Market Fund"
];

export const fallbackUtaslFunds: UtaslFundPrice[] = [
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Cash Management Trust Fund", sellingPrice: 47.5165, buyingPrice: 47.5165, date: "10 Nov 2026", effectiveNav: 47.5165 },
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Equity Income Fund", sellingPrice: 18.6371, buyingPrice: 18.2369, date: "10 Nov 2026", effectiveNav: 18.2369 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "Astrue Alpha Fund", sellingPrice: 33.7648, buyingPrice: 31.727, date: "10 Nov 2026", effectiveNav: 31.727 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Active Income Fund", sellingPrice: 223.4316, buyingPrice: 223.4316, date: "10 Nov 2026", effectiveNav: 223.4316 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Money Market Fund", sellingPrice: 12.4355, buyingPrice: 12.4355, date: "10 Nov 2026", effectiveNav: 12.4355 },
  { company: "Assetline Capital (Pvt) Ltd", fundName: "Assetline Income Fund", sellingPrice: 31.4457, buyingPrice: 31.4457, date: "10 Nov 2026", effectiveNav: 31.4457 },
  { company: "Assetline Capital (Pvt) Ltd", fundName: "Assetline Income Plus Growth Fund", sellingPrice: 33.2387, buyingPrice: 32.7615, date: "10 Nov 2026", effectiveNav: 32.7615 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Equity Fund", sellingPrice: 75.96, buyingPrice: 72.34, date: "10 Nov 2026", effectiveNav: 72.34 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Gilt-Edged Fund", sellingPrice: 18.7817, buyingPrice: 18.7817, date: "10 Nov 2026", effectiveNav: 18.7817 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith High Yield Fund", sellingPrice: 21.5621, buyingPrice: 21.5621, date: "10 Nov 2026", effectiveNav: 21.5621 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Growth Equity Fund", sellingPrice: 47.1065, buyingPrice: 46.1231, date: "10 Nov 2026", effectiveNav: 46.1231 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Income Fund", sellingPrice: 19.3856, buyingPrice: 19.3856, date: "10 Nov 2026", effectiveNav: 19.3856 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Money Market Fund", sellingPrice: 36.5781, buyingPrice: 36.5781, date: "10 Nov 2026", effectiveNav: 36.5781 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Quant Equity Fund", sellingPrice: 68.8066, buyingPrice: 70.201, date: "10 Nov 2026", effectiveNav: 70.201 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Balanced Fund", sellingPrice: 36.1214, buyingPrice: 36.9608, date: "10 Nov 2026", effectiveNav: 36.9608 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Medium Risk Debt Fund", sellingPrice: 25.9258, buyingPrice: 25.9258, date: "10 Nov 2026", effectiveNav: 25.9258 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Gilt Trading Fund", sellingPrice: 83.3293, buyingPrice: 83.3293, date: "10 Nov 2026", effectiveNav: 83.3293 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Gilt Fund", sellingPrice: 14.8418, buyingPrice: 14.8418, date: "10 Nov 2026", effectiveNav: 14.8418 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Corporate Treasury Fund", sellingPrice: 28.6981, buyingPrice: 28.6981, date: "10 Nov 2026", effectiveNav: 28.6981 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Income Fund", sellingPrice: 43.0743, buyingPrice: 43.0743, date: "10 Nov 2026", effectiveNav: 43.0743 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL High Yield Fund", sellingPrice: 48.4338, buyingPrice: 48.4338, date: "10 Nov 2026", effectiveNav: 48.4338 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Investment Grade Fund", sellingPrice: 42.1986, buyingPrice: 42.1986, date: "10 Nov 2026", effectiveNav: 42.1986 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Money Market Fund", sellingPrice: 7.4656, buyingPrice: 7.4656, date: "10 Nov 2026", effectiveNav: 7.4656 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Islamic Money Market Fund", sellingPrice: 10.6428, buyingPrice: 10.6428, date: "10 Nov 2026", effectiveNav: 10.6428 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Fixed Income Opportunities Fund", sellingPrice: 44.6456, buyingPrice: 44.6456, date: "10 Nov 2026", effectiveNav: 44.6456 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Unit Trust", sellingPrice: 52.25, buyingPrice: 49.97, date: "10 Nov 2026", effectiveNav: 49.97 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Century Growth", sellingPrice: 184.26, buyingPrice: 176.51, date: "10 Nov 2026", effectiveNav: 176.51 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Savings Plus Money Market Fund", sellingPrice: 19.9941, buyingPrice: 19.9941, date: "10 Nov 2026", effectiveNav: 19.9941 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Surakum Fund", sellingPrice: 24.1346, buyingPrice: 24.1346, date: "10 Nov 2026", effectiveNav: 24.1346 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Gilt Edge Fund (A Series)", sellingPrice: 25.7964, buyingPrice: 25.7964, date: "10 Nov 2026", effectiveNav: 25.7964 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank High Yield Fund", sellingPrice: 27.0311, buyingPrice: 27.0311, date: "10 Nov 2026", effectiveNav: 27.0311 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Money Market Fund", sellingPrice: 32.1624, buyingPrice: 32.1624, date: "10 Nov 2026", effectiveNav: 32.1624 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Treasury Income Fund", sellingPrice: 6.841, buyingPrice: 6.841, date: "10 Nov 2026", effectiveNav: 6.841 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Income Fund", sellingPrice: 38.5107, buyingPrice: 38.5107, date: "10 Nov 2026", effectiveNav: 38.5107 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Dollar Bond Fund (in $ )", sellingPrice: 1.2014, buyingPrice: 1.1954, date: "10 Nov 2026", effectiveNav: 1.1954 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Wealth Plus Fund", sellingPrice: 13.4062, buyingPrice: 13.4062, date: "10 Nov 2026", effectiveNav: 13.4062 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Tourism Fund", sellingPrice: 5.08, buyingPrice: 4.88, date: "10 Nov 2026", effectiveNav: 4.88 },
  { company: "Ceylon Asset Management Limited", fundName: "CEYLON Index Fund", sellingPrice: 133.33, buyingPrice: 128.08, date: "10 Nov 2026", effectiveNav: 128.08 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Financial Sector Fund", sellingPrice: 20.72, buyingPrice: 19.89, date: "10 Nov 2026", effectiveNav: 19.89 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Equity Fund (FCEF)", sellingPrice: 4619.56, buyingPrice: 4550.27, date: "10 Nov 2026", effectiveNav: 4550.27 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Fixed income Fund", sellingPrice: 4663.89, buyingPrice: 4663.89, date: "10 Nov 2026", effectiveNav: 4663.89 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Gilt Edged Fund", sellingPrice: 2836.54, buyingPrice: 2836.54, date: "10 Nov 2026", effectiveNav: 2836.54 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Market Fund", sellingPrice: 3829.33, buyingPrice: 3829.33, date: "10 Nov 2026", effectiveNav: 3829.33 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Wealth Fund", sellingPrice: 2357.96, buyingPrice: 2357.96, date: "10 Nov 2026", effectiveNav: 2357.96 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Plus Fund", sellingPrice: 1221.04, buyingPrice: 1221.04, date: "10 Nov 2026", effectiveNav: 1221.04 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Credit Opportunity Fund", sellingPrice: 10.7651, buyingPrice: 10.7651, date: "10 Nov 2026", effectiveNav: 10.7651 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Money Market Fund", sellingPrice: 56.452, buyingPrice: 56.452, date: "10 Nov 2026", effectiveNav: 56.452 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Short Term Gilt Fund", sellingPrice: 30.1406, buyingPrice: 30.1406, date: "10 Nov 2026", effectiveNav: 30.1406 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Value Equity Fund", sellingPrice: 88.3844, buyingPrice: 83.9345, date: "10 Nov 2026", effectiveNav: 83.9345 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Dynamic Opportunities Fund", sellingPrice: 330.7181, buyingPrice: 314.3912, date: "10 Nov 2026", effectiveNav: 314.3912 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Income Fund", sellingPrice: 189.5155, buyingPrice: 185.7218, date: "10 Nov 2026", effectiveNav: 185.7218 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Liquid Money Fund", sellingPrice: 119.1737, buyingPrice: 119.1737, date: "10 Nov 2026", effectiveNav: 119.1737 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Optimal Yield Fund", sellingPrice: 107.0119, buyingPrice: 104.8712, date: "10 Nov 2026", effectiveNav: 104.8712 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth Fund", sellingPrice: 24.69, buyingPrice: 24.16, date: "10 Nov 2026", effectiveNav: 24.16 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth & Income Fund", sellingPrice: 136.15, buyingPrice: 133.24, date: "10 Nov 2026", effectiveNav: 133.24 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Fund", sellingPrice: 37.0626, buyingPrice: 37.0626, date: "10 Nov 2026", effectiveNav: 37.0626 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Gilt Edged Fund", sellingPrice: 43.1051, buyingPrice: 43.1051, date: "10 Nov 2026", effectiveNav: 43.1051 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Plus Fund", sellingPrice: 34.4355, buyingPrice: 34.4355, date: "10 Nov 2026", effectiveNav: 34.4355 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Plus Fund", sellingPrice: 44.7324, buyingPrice: 44.7324, date: "10 Nov 2026", effectiveNav: 44.7324 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Fund", sellingPrice: 40.5687, buyingPrice: 40.5687, date: "10 Nov 2026", effectiveNav: 40.5687 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Islamic Money Plus Fund", sellingPrice: 27.6457, buyingPrice: 27.6457, date: "10 Nov 2026", effectiveNav: 27.6457 },
  { company: "National Asset Management Limited", fundName: "NAMAL Growth Fund", sellingPrice: 362.3577, buyingPrice: 349.5633, date: "10 Nov 2026", effectiveNav: 349.5633 },
  { company: "National Asset Management Limited", fundName: "National Equity Fund", sellingPrice: 79.0426, buyingPrice: 76.1496, date: "10 Nov 2026", effectiveNav: 76.1496 },
  { company: "National Asset Management Limited", fundName: "NAMAL Income Fund", sellingPrice: 16.3479, buyingPrice: 16.3479, date: "10 Nov 2026", effectiveNav: 16.3479 },
  { company: "National Asset Management Limited", fundName: "NAMAL High Yield Fund", sellingPrice: 49.0287, buyingPrice: 49.0287, date: "10 Nov 2026", effectiveNav: 49.0287 },
  { company: "Premier Wealth Management Limited", fundName: "Premier Money Market Fund", sellingPrice: 35.8564, buyingPrice: 35.8564, date: "10 Nov 2026", effectiveNav: 35.8564 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Money Market Fund", sellingPrice: 30.5432, buyingPrice: 30.5432, date: "10 Nov 2026", effectiveNav: 30.5432 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Dynamic Income Fund", sellingPrice: 23.9149, buyingPrice: 23.9149, date: "10 Nov 2026", effectiveNav: 23.9149 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Shariah Income Fund", sellingPrice: 19.7531, buyingPrice: 19.7531, date: "10 Nov 2026", effectiveNav: 19.7531 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Growth Fund", sellingPrice: 27.3, buyingPrice: 26.36, date: "10 Nov 2026", effectiveNav: 26.36 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Shariah Balanced Fund", sellingPrice: 22.18, buyingPrice: 21.51, date: "10 Nov 2026", effectiveNav: 21.51 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Dividend Fund", sellingPrice: 21.4051, buyingPrice: 20.9787, date: "10 Nov 2026", effectiveNav: 20.9787 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Consumer Staples Fund", sellingPrice: 21.81, buyingPrice: 21.37, date: "10 Nov 2026", effectiveNav: 21.37 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Insurance Sector Fund", sellingPrice: 19.13, buyingPrice: 18.74, date: "10 Nov 2026", effectiveNav: 18.74 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Select Factor Fund", sellingPrice: 14.08, buyingPrice: 13.8, date: "10 Nov 2026", effectiveNav: 13.8 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Financial Services Fund", sellingPrice: 23.63, buyingPrice: 23.16, date: "10 Nov 2026", effectiveNav: 23.16 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Money Market Fund", sellingPrice: 196.9049, buyingPrice: 196.9049, date: "10 Nov 2026", effectiveNav: 196.9049 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Equity Fund", sellingPrice: 281.2847, buyingPrice: 267.0943, date: "10 Nov 2026", effectiveNav: 267.0943 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Income Fund", sellingPrice: 104.7647, buyingPrice: 104.7647, date: "10 Nov 2026", effectiveNav: 104.7647 }
];

function normalize(text: string): string {
  return text.toLowerCase()
    .replace(/fund/g, '')
    .replace(/unit trust/g, '')
    .replace(/limited/g, '')
    .replace(/ltd/g, '')
    .replace(/pvt/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseUtaslHtml(html: string): UtaslFundPrice[] {
  const funds: UtaslFundPrice[] = [];
  const dateMatch = html.match(/Unit Trust Price on\s+([0-9]{1,2}\s+[A-Za-z]+\s+[0-9]{4})/i) ||
                    html.match(/As at\s+([0-9]{1,2}\s+[A-Za-z]+\s+[0-9]{4})/i) ||
                    html.match(/([0-9]{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+[0-9]{4})/i);
  const publishedDate = dateMatch ? dateMatch[1] : 'Live';

  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rowMatch;
  while ((rowMatch = rowRegex.exec(html)) !== null) {
    const rowContent = rowMatch[1];
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const cells: string[] = [];
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
  return funds;
}

function mergeFundLists(liveList: UtaslFundPrice[], fallbackList: UtaslFundPrice[]): UtaslFundPrice[] {
  const map = new Map<string, UtaslFundPrice>();

  // Add fallback first
  for (const f of fallbackList) {
    map.set(normalize(f.fundName), f);
  }

  // Live overrides fallback
  for (const f of liveList) {
    map.set(normalize(f.fundName), f);
  }

  return Array.from(map.values());
}

let cachedLiveFunds: UtaslFundPrice[] | null = null;
let lastUtaslFetchTime = 0;

export async function fetchUtaslFundPrices(forceRefresh: boolean = false): Promise<UtaslFundPrice[]> {
  // If recently fetched in memory and not force refreshing, reuse
  if (!forceRefresh && cachedLiveFunds && cachedLiveFunds.length > 0 && Date.now() - lastUtaslFetchTime < 30000) {
    return cachedLiveFunds;
  }

  // Helper to commit newly fetched live funds
  const handleSuccess = (funds: UtaslFundPrice[]): UtaslFundPrice[] => {
    const merged = mergeFundLists(funds, fallbackUtaslFunds);
    cachedLiveFunds = merged;
    lastUtaslFetchTime = Date.now();
    try {
      localStorage.setItem('pearlport_cached_utasl_funds', JSON.stringify(merged));
      localStorage.setItem('pearlport_cached_utasl_time', Date.now().toString());
    } catch {}
    return merged;
  };

  // Tier 1: Try Capacitor Native HTTP if on mobile (Android/iOS)
  // CapacitorHttp completely bypasses browser CORS restrictions
  try {
    if (typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.()) {
      const { CapacitorHttp } = await import('@capacitor/core');
      const capRes = await CapacitorHttp.get({
        url: 'https://www.utasl.lk/unit-prices/',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Cookie': 'hc_js_gate=1'
        }
      });
      if (capRes && capRes.status === 200 && capRes.data) {
        const htmlStr = typeof capRes.data === 'string' ? capRes.data : JSON.stringify(capRes.data);
        const parsed = parseUtaslHtml(htmlStr);
        if (parsed.length > 0) {
          return handleSuccess(parsed);
        }
      }
    }
  } catch (err) {
    // Proceed to web tiers
  }

  // Tier 2: Web endpoints (Vite dev proxy, static JSON, GitHub raw dataset)
  const endpoints = [
    // 1. If in Vite development mode, use local dev proxy directly
    ...((import.meta as any)?.env?.DEV ? ['/api/utasl/unit-prices/'] : []),
    // 2. GitHub raw dataset with CORS enabled (daily synced via GitHub Actions)
    `https://raw.githubusercontent.com/hariuda/pearl-port-web/main/public/data/utasl-funds.json?t=${Date.now()}`,
    // 3. Bundled static data file served by Firebase Hosting / local web server
    `/data/utasl-funds.json?t=${Date.now()}`,
    // 4. Vite proxy route
    '/api/utasl/unit-prices/',
    // 5. Direct URL (works in browser environments where CORS is disabled or extension enabled)
    'https://www.utasl.lk/unit-prices/'
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json, text/html, */*'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const text = await res.text();
        const trimmed = text.trim();

        // Check if JSON response (e.g. from utasl-funds.json)
        if (trimmed.startsWith('{') && trimmed.includes('"funds"')) {
          try {
            const data = JSON.parse(trimmed);
            if (Array.isArray(data.funds) && data.funds.length > 0) {
              const validFunds: UtaslFundPrice[] = data.funds.filter(
                (f: any) => f.fundName && (f.sellingPrice > 0 || f.buyingPrice > 0 || f.effectiveNav > 0)
              );
              if (validFunds.length > 0) {
                return handleSuccess(validFunds);
              }
            }
          } catch {}
        }

        // Check if HTML response with uta-table
        if (trimmed.includes('uta-table') || trimmed.includes('<tr')) {
          const parsed = parseUtaslHtml(trimmed);
          if (parsed.length > 0) {
            return handleSuccess(parsed);
          }
        }
      }
    } catch {
      // Continue to next endpoint
    }
  }

  // Tier 3: If live fetch fails, check localStorage cache
  if (!cachedLiveFunds) {
    try {
      const stored = localStorage.getItem('pearlport_cached_utasl_funds');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cal = parsed.find((f: any) => f.fundName?.includes('High Yield') && (f.fundName?.includes('CAL') || f.company?.includes('CAL') || f.company?.includes('Capital Alliance')));
          if (!cal || cal.effectiveNav > 35) {
            cachedLiveFunds = parsed;
            return parsed;
          } else {
            localStorage.removeItem('pearlport_cached_utasl_funds');
          }
        }
      }
    } catch {}
  }

  cachedLiveFunds = fallbackUtaslFunds;
  return fallbackUtaslFunds;
}

export function getUtaslFundsList(): UtaslFundPrice[] {
  if (cachedLiveFunds && cachedLiveFunds.length > 0) {
    return cachedLiveFunds;
  }
  try {
    const stored = localStorage.getItem('pearlport_cached_utasl_funds');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const cal = parsed.find((f: any) => f.fundName?.includes('High Yield') && (f.fundName?.includes('CAL') || f.company?.includes('CAL') || f.company?.includes('Capital Alliance')));
        if (!cal || cal.effectiveNav > 35) {
          cachedLiveFunds = parsed;
          return parsed;
        } else {
          localStorage.removeItem('pearlport_cached_utasl_funds');
        }
      }
    }
  } catch {}
  return fallbackUtaslFunds;
}

export function findBestUtaslMatch(
  userFundName: string,
  list: UtaslFundPrice[] = getUtaslFundsList()
): UtaslFundPrice | null {
  if (!userFundName || userFundName.trim() === '' || list.length === 0) return null;

  const rawUser = userFundName.trim();
  const lowerUser = rawUser.toLowerCase();
  const normUser = normalize(rawUser);

  // 1. Exact match (case insensitive)
  const exact = list.find(it => it.fundName.toLowerCase() === lowerUser);
  if (exact) return exact;

  // 2. Normalized exact match (ignores 'fund', 'unit trust', punctuation)
  const normExact = list.find(it => normalize(it.fundName) === normUser);
  if (normExact) return normExact;

  // 3. Best scored match based on token overlap & category keyword preservation
  const userTokens = normUser.split(' ').filter(t => t.length > 1);
  if (userTokens.length === 0) return null;

  let bestMatch: UtaslFundPrice | null = null;
  let highestScore = 0;

  for (const item of list) {
    const normCand = normalize(item.fundName);
    const candTokens = normCand.split(' ').filter(t => t.length > 1);

    const userSet = new Set(userTokens);
    const candSet = new Set(candTokens);
    let commonCount = 0;
    for (const t of userSet) {
      if (candSet.has(t)) commonCount++;
    }

    // Critical distinguishing keywords check:
    const criticalWords = ['income', 'growth', 'gilt', 'equity', 'balanced', 'plus', 'yield', 'shariah', 'islamic', 'money', 'century', 'surakum'];
    let mismatch = false;
    for (const cw of criticalWords) {
      const inUser = userSet.has(cw);
      const inCand = candSet.has(cw);
      if (inUser !== inCand) {
        mismatch = true;
        break;
      }
    }

    const unionCount = new Set([...userTokens, ...candTokens]).size;
    let score = unionCount > 0 ? (commonCount / unionCount) : 0;

    if (mismatch) {
      score *= 0.3; // severe penalty for category product mismatch
    }

    if (normCand.startsWith(normUser) || normUser.startsWith(normCand)) {
      score += 0.2;
    }

    if (score > highestScore && score >= 0.45) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return bestMatch;
}

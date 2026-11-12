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
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Cash Management Trust Fund", sellingPrice: 47.5295, buyingPrice: 47.5295, date: "11 Nov 2026", effectiveNav: 47.5295 },
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Equity Income Fund", sellingPrice: 18.4209, buyingPrice: 18.0379, date: "11 Nov 2026", effectiveNav: 18.0379 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "Astrue Alpha Fund", sellingPrice: 33.8093, buyingPrice: 31.7743, date: "11 Nov 2026", effectiveNav: 31.7743 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Active Income Fund", sellingPrice: 223.4939, buyingPrice: 223.4939, date: "11 Nov 2026", effectiveNav: 223.4939 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Money Market Fund", sellingPrice: 12.4385, buyingPrice: 12.4385, date: "11 Nov 2026", effectiveNav: 12.4385 },
  { company: "Assetline Capital (Pvt) Ltd", fundName: "Assetline Income Fund", sellingPrice: 31.4529, buyingPrice: 31.4529, date: "11 Nov 2026", effectiveNav: 31.4529 },
  { company: "Assetline Capital (Pvt) Ltd", fundName: "Assetline Income Plus Growth Fund", sellingPrice: 33.1786, buyingPrice: 32.7048, date: "11 Nov 2026", effectiveNav: 32.7048 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Equity Fund", sellingPrice: 75.66, buyingPrice: 72.06, date: "11 Nov 2026", effectiveNav: 72.06 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Gilt-Edged Fund", sellingPrice: 18.7851, buyingPrice: 18.7851, date: "11 Nov 2026", effectiveNav: 18.7851 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith High Yield Fund", sellingPrice: 21.5674, buyingPrice: 21.5674, date: "11 Nov 2026", effectiveNav: 21.5674 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Growth Equity Fund", sellingPrice: 46.9512, buyingPrice: 45.9781, date: "11 Nov 2026", effectiveNav: 45.9781 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Income Fund", sellingPrice: 19.4107, buyingPrice: 19.4107, date: "11 Nov 2026", effectiveNav: 19.4107 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Money Market Fund", sellingPrice: 36.5867, buyingPrice: 36.5867, date: "11 Nov 2026", effectiveNav: 36.5867 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Quant Equity Fund", sellingPrice: 68.649, buyingPrice: 70.0714, date: "11 Nov 2026", effectiveNav: 70.0714 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Balanced Fund", sellingPrice: 36.1268, buyingPrice: 36.8833, date: "11 Nov 2026", effectiveNav: 36.8833 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Medium Risk Debt Fund", sellingPrice: 25.9313, buyingPrice: 25.9313, date: "11 Nov 2026", effectiveNav: 25.9313 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Gilt Trading Fund", sellingPrice: 83.3454, buyingPrice: 83.3454, date: "11 Nov 2026", effectiveNav: 83.3454 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Gilt Fund", sellingPrice: 14.8451, buyingPrice: 14.8451, date: "11 Nov 2026", effectiveNav: 14.8451 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Corporate Treasury Fund", sellingPrice: 28.7045, buyingPrice: 28.7045, date: "11 Nov 2026", effectiveNav: 28.7045 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Income Fund", sellingPrice: 43.0842, buyingPrice: 43.0842, date: "11 Nov 2026", effectiveNav: 43.0842 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL High Yield Fund", sellingPrice: 48.4487, buyingPrice: 48.4487, date: "11 Nov 2026", effectiveNav: 48.4487 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Investment Grade Fund", sellingPrice: 42.2087, buyingPrice: 42.2087, date: "11 Nov 2026", effectiveNav: 42.2087 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Money Market Fund", sellingPrice: 7.4672, buyingPrice: 7.4672, date: "11 Nov 2026", effectiveNav: 7.4672 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Islamic Money Market Fund", sellingPrice: 10.6455, buyingPrice: 10.6455, date: "11 Nov 2026", effectiveNav: 10.6455 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Fixed Income Opportunities Fund", sellingPrice: 44.6571, buyingPrice: 44.6571, date: "11 Nov 2026", effectiveNav: 44.6571 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Unit Trust", sellingPrice: 52.12, buyingPrice: 49.85, date: "11 Nov 2026", effectiveNav: 49.85 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Century Growth", sellingPrice: 183.43, buyingPrice: 175.72, date: "11 Nov 2026", effectiveNav: 175.72 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Savings Plus Money Market Fund", sellingPrice: 19.9987, buyingPrice: 19.9987, date: "11 Nov 2026", effectiveNav: 19.9987 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Surakum Fund", sellingPrice: 24.1389, buyingPrice: 24.1389, date: "11 Nov 2026", effectiveNav: 24.1389 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Gilt Edge Fund (A Series)", sellingPrice: 25.8024, buyingPrice: 25.8024, date: "11 Nov 2026", effectiveNav: 25.8024 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank High Yield Fund", sellingPrice: 27.0381, buyingPrice: 27.0381, date: "11 Nov 2026", effectiveNav: 27.0381 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Money Market Fund", sellingPrice: 32.1707, buyingPrice: 32.1707, date: "11 Nov 2026", effectiveNav: 32.1707 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Treasury Income Fund", sellingPrice: 6.8426, buyingPrice: 6.8426, date: "11 Nov 2026", effectiveNav: 6.8426 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Income Fund", sellingPrice: 38.5231, buyingPrice: 38.5231, date: "11 Nov 2026", effectiveNav: 38.5231 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Dollar Bond Fund (in $ )", sellingPrice: 1.2018, buyingPrice: 1.1958, date: "11 Nov 2026", effectiveNav: 1.1958 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Wealth Plus Fund", sellingPrice: 13.4102, buyingPrice: 13.4102, date: "11 Nov 2026", effectiveNav: 13.4102 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Tourism Fund", sellingPrice: 5.06, buyingPrice: 4.85, date: "11 Nov 2026", effectiveNav: 4.85 },
  { company: "Ceylon Asset Management Limited", fundName: "CEYLON Index Fund", sellingPrice: 133.06, buyingPrice: 127.78, date: "11 Nov 2026", effectiveNav: 127.78 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Financial Sector Fund", sellingPrice: 20.72, buyingPrice: 19.88, date: "11 Nov 2026", effectiveNav: 19.88 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Equity Fund (FCEF)", sellingPrice: 4595.42, buyingPrice: 4526.49, date: "11 Nov 2026", effectiveNav: 4526.49 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Fixed income Fund", sellingPrice: 4665.22, buyingPrice: 4665.22, date: "11 Nov 2026", effectiveNav: 4665.22 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Gilt Edged Fund", sellingPrice: 2840.28, buyingPrice: 2840.28, date: "11 Nov 2026", effectiveNav: 2840.28 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Market Fund", sellingPrice: 3830.23, buyingPrice: 3830.23, date: "11 Nov 2026", effectiveNav: 3830.23 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Wealth Fund", sellingPrice: 2364.39, buyingPrice: 2364.39, date: "11 Nov 2026", effectiveNav: 2364.39 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Plus Fund", sellingPrice: 1221.29, buyingPrice: 1221.29, date: "11 Nov 2026", effectiveNav: 1221.29 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Credit Opportunity Fund", sellingPrice: 10.7682, buyingPrice: 10.7682, date: "11 Nov 2026", effectiveNav: 10.7682 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Money Market Fund", sellingPrice: 56.4667, buyingPrice: 56.4667, date: "11 Nov 2026", effectiveNav: 56.4667 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Short Term Gilt Fund", sellingPrice: 30.148, buyingPrice: 30.148, date: "11 Nov 2026", effectiveNav: 30.148 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Value Equity Fund", sellingPrice: 88.0643, buyingPrice: 83.6343, date: "11 Nov 2026", effectiveNav: 83.6343 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Dynamic Opportunities Fund", sellingPrice: 330.668, buyingPrice: 314.5009, date: "11 Nov 2026", effectiveNav: 314.5009 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Income Fund", sellingPrice: 189.5895, buyingPrice: 185.7943, date: "11 Nov 2026", effectiveNav: 185.7943 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Liquid Money Fund", sellingPrice: 119.204, buyingPrice: 119.204, date: "11 Nov 2026", effectiveNav: 119.204 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Optimal Yield Fund", sellingPrice: 107.0762, buyingPrice: 104.9342, date: "11 Nov 2026", effectiveNav: 104.9342 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth Fund", sellingPrice: 24.62, buyingPrice: 24.09, date: "11 Nov 2026", effectiveNav: 24.09 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth & Income Fund", sellingPrice: 135.2, buyingPrice: 132.33, date: "11 Nov 2026", effectiveNav: 132.33 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Fund", sellingPrice: 37.0726, buyingPrice: 37.0726, date: "11 Nov 2026", effectiveNav: 37.0726 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Gilt Edged Fund", sellingPrice: 43.2199, buyingPrice: 43.2199, date: "11 Nov 2026", effectiveNav: 43.2199 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Plus Fund", sellingPrice: 34.4454, buyingPrice: 34.4454, date: "11 Nov 2026", effectiveNav: 34.4454 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Plus Fund", sellingPrice: 44.7431, buyingPrice: 44.7431, date: "11 Nov 2026", effectiveNav: 44.7431 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Fund", sellingPrice: 40.5783, buyingPrice: 40.5783, date: "11 Nov 2026", effectiveNav: 40.5783 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Islamic Money Plus Fund", sellingPrice: 27.6521, buyingPrice: 27.6521, date: "11 Nov 2026", effectiveNav: 27.6521 },
  { company: "National Asset Management Limited", fundName: "NAMAL Growth Fund", sellingPrice: 362.3011, buyingPrice: 349.5096, date: "11 Nov 2026", effectiveNav: 349.5096 },
  { company: "National Asset Management Limited", fundName: "National Equity Fund", sellingPrice: 79.0981, buyingPrice: 76.2032, date: "11 Nov 2026", effectiveNav: 76.2032 },
  { company: "National Asset Management Limited", fundName: "NAMAL Income Fund", sellingPrice: 16.353, buyingPrice: 16.353, date: "11 Nov 2026", effectiveNav: 16.353 },
  { company: "National Asset Management Limited", fundName: "NAMAL High Yield Fund", sellingPrice: 49.0424, buyingPrice: 49.0424, date: "11 Nov 2026", effectiveNav: 49.0424 },
  { company: "Premier Wealth Management Limited", fundName: "Premier Money Market Fund", sellingPrice: 35.8654, buyingPrice: 35.8654, date: "11 Nov 2026", effectiveNav: 35.8654 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Money Market Fund", sellingPrice: 30.5505, buyingPrice: 30.5505, date: "11 Nov 2026", effectiveNav: 30.5505 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Dynamic Income Fund", sellingPrice: 23.9322, buyingPrice: 23.9322, date: "11 Nov 2026", effectiveNav: 23.9322 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Shariah Income Fund", sellingPrice: 19.7576, buyingPrice: 19.7576, date: "11 Nov 2026", effectiveNav: 19.7576 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Growth Fund", sellingPrice: 27.29, buyingPrice: 26.35, date: "11 Nov 2026", effectiveNav: 26.35 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Shariah Balanced Fund", sellingPrice: 22.16, buyingPrice: 21.49, date: "11 Nov 2026", effectiveNav: 21.49 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Dividend Fund", sellingPrice: 21.3334, buyingPrice: 20.9082, date: "11 Nov 2026", effectiveNav: 20.9082 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Financial Services Fund", sellingPrice: 23.56, buyingPrice: 23.09, date: "11 Nov 2026", effectiveNav: 23.09 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Consumer Staples Fund", sellingPrice: 21.9, buyingPrice: 21.46, date: "11 Nov 2026", effectiveNav: 21.46 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Insurance Sector Fund", sellingPrice: 18.93, buyingPrice: 18.55, date: "11 Nov 2026", effectiveNav: 18.55 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Select Factor Fund", sellingPrice: 14.03, buyingPrice: 13.77, date: "11 Nov 2026", effectiveNav: 13.77 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Money Market Fund", sellingPrice: 196.9566, buyingPrice: 196.9566, date: "11 Nov 2026", effectiveNav: 196.9566 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Equity Fund", sellingPrice: 281.27, buyingPrice: 267.2735, date: "11 Nov 2026", effectiveNav: 267.2735 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Income Fund", sellingPrice: 104.7959, buyingPrice: 104.7959, date: "11 Nov 2026", effectiveNav: 104.7959 }
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

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
  "CT Smith Equity Fund",
  "CT Smith Gilt-Edged Fund",
  "CT Smith High Yield Fund",
  "Ceybank Century Growth",
  "Ceybank Gilt Edge Fund (A Series)",
  "Ceybank High Yield Fund",
  "Ceybank Savings Plus Money Market Fund",
  "Ceybank Surakum Fund",
  "Ceybank Unit Trust",
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
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Cash Management Trust Fund", sellingPrice: 47.2562, buyingPrice: 47.2562, date: "21 Oct 2026", effectiveNav: 47.2562 },
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Equity Income Fund", sellingPrice: 16.4511, buyingPrice: 16.0913, date: "21 Oct 2026", effectiveNav: 16.0913 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "Astrue Alpha Fund", sellingPrice: 30.637, buyingPrice: 28.8128, date: "21 Oct 2026", effectiveNav: 28.8128 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Active Income Fund", sellingPrice: 222.3009, buyingPrice: 222.3009, date: "21 Oct 2026", effectiveNav: 222.3009 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Money Market Fund", sellingPrice: 12.3755, buyingPrice: 12.3755, date: "21 Oct 2026", effectiveNav: 12.3755 },
  { company: "Assetline Capital (Pvt) Ltd", fundName: "Assetline Income Fund", sellingPrice: 31.3006, buyingPrice: 31.3006, date: "21 Oct 2026", effectiveNav: 31.3006 },
  { company: "Assetline Capital (Pvt) Ltd", fundName: "Assetline Income Plus Growth Fund", sellingPrice: 30.5539, buyingPrice: 30.1353, date: "21 Oct 2026", effectiveNav: 30.1353 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Equity Fund", sellingPrice: 68.28, buyingPrice: 64.94, date: "21 Oct 2026", effectiveNav: 64.94 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Gilt-Edged Fund", sellingPrice: 18.7123, buyingPrice: 18.7123, date: "21 Oct 2026", effectiveNav: 18.7123 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith High Yield Fund", sellingPrice: 21.4548, buyingPrice: 21.4548, date: "21 Oct 2026", effectiveNav: 21.4548 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Islamic Money Market Fund", sellingPrice: 10.5945, buyingPrice: 10.5945, date: "21 Oct 2026", effectiveNav: 10.5945 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Quant Equity Fund", sellingPrice: 62.4449, buyingPrice: 63.6483, date: "21 Oct 2026", effectiveNav: 63.6483 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Balanced Fund", sellingPrice: 32.7271, buyingPrice: 33.3723, date: "21 Oct 2026", effectiveNav: 33.3723 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Medium Risk Debt Fund", sellingPrice: 25.8166, buyingPrice: 25.8166, date: "21 Oct 2026", effectiveNav: 25.8166 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Gilt Trading Fund", sellingPrice: 83.0089, buyingPrice: 83.0089, date: "21 Oct 2026", effectiveNav: 83.0089 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Gilt Fund", sellingPrice: 14.7785, buyingPrice: 14.7785, date: "21 Oct 2026", effectiveNav: 14.7785 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Corporate Treasury Fund", sellingPrice: 28.5763, buyingPrice: 28.5763, date: "21 Oct 2026", effectiveNav: 28.5763 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Income Fund", sellingPrice: 42.8746, buyingPrice: 42.8746, date: "21 Oct 2026", effectiveNav: 42.8746 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL High Yield Fund", sellingPrice: 48.1494, buyingPrice: 48.1494, date: "21 Oct 2026", effectiveNav: 48.1494 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Investment Grade Fund", sellingPrice: 41.955, buyingPrice: 41.955, date: "21 Oct 2026", effectiveNav: 41.955 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Money Market Fund", sellingPrice: 7.4339, buyingPrice: 7.4339, date: "21 Oct 2026", effectiveNav: 7.4339 },
  { company: "Capital Alliance Investments Ltd", fundName: "CAL Fixed Income Opportunities Fund", sellingPrice: 44.3769, buyingPrice: 44.3769, date: "21 Oct 2026", effectiveNav: 44.3769 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Unit Trust", sellingPrice: 47.5, buyingPrice: 45.44, date: "21 Oct 2026", effectiveNav: 45.44 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Century Growth", sellingPrice: 167.97, buyingPrice: 160.73, date: "21 Oct 2026", effectiveNav: 160.73 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Savings Plus Money Market Fund", sellingPrice: 19.8967, buyingPrice: 19.8967, date: "21 Oct 2026", effectiveNav: 19.8967 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Surakum Fund", sellingPrice: 24.0476, buyingPrice: 24.0476, date: "21 Oct 2026", effectiveNav: 24.0476 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Gilt Edge Fund (A Series)", sellingPrice: 25.6759, buyingPrice: 25.6759, date: "21 Oct 2026", effectiveNav: 25.6759 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank High Yield Fund", sellingPrice: 26.8916, buyingPrice: 26.8916, date: "21 Oct 2026", effectiveNav: 26.8916 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Equity Fund (FCEF)", sellingPrice: 4165.62, buyingPrice: 4103.14, date: "21 Oct 2026", effectiveNav: 4103.14 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Fixed income Fund", sellingPrice: 4637.23, buyingPrice: 4637.23, date: "21 Oct 2026", effectiveNav: 4637.23 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Gilt Edged Fund", sellingPrice: 2822.22, buyingPrice: 2822.22, date: "21 Oct 2026", effectiveNav: 2822.22 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Market Fund", sellingPrice: 3812.42, buyingPrice: 3812.42, date: "21 Oct 2026", effectiveNav: 3812.42 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Wealth Fund", sellingPrice: 2329.52, buyingPrice: 2329.52, date: "21 Oct 2026", effectiveNav: 2329.52 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Plus Fund", sellingPrice: 1215.59, buyingPrice: 1215.59, date: "21 Oct 2026", effectiveNav: 1215.59 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Credit Opportunity Fund", sellingPrice: 10.7034, buyingPrice: 10.7034, date: "21 Oct 2026", effectiveNav: 10.7034 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Money Market Fund", sellingPrice: 56.1617, buyingPrice: 56.1617, date: "21 Oct 2026", effectiveNav: 56.1617 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Short Term Gilt Fund", sellingPrice: 29.9942, buyingPrice: 29.9942, date: "21 Oct 2026", effectiveNav: 29.9942 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Value Equity Fund", sellingPrice: 80.4994, buyingPrice: 76.4674, date: "21 Oct 2026", effectiveNav: 76.4674 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Dynamic Opportunities Fund", sellingPrice: 293.1868, buyingPrice: 278.9086, date: "21 Oct 2026", effectiveNav: 278.9086 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Income Fund", sellingPrice: 188.5134, buyingPrice: 184.7398, date: "21 Oct 2026", effectiveNav: 184.7398 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Liquid Money Fund", sellingPrice: 118.5767, buyingPrice: 118.5767, date: "21 Oct 2026", effectiveNav: 118.5767 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Optimal Yield Fund", sellingPrice: 106.3137, buyingPrice: 104.1869, date: "21 Oct 2026", effectiveNav: 104.1869 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth Fund", sellingPrice: 22.14, buyingPrice: 21.68, date: "21 Oct 2026", effectiveNav: 21.68 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth & Income Fund", sellingPrice: 121.49, buyingPrice: 118.93, date: "21 Oct 2026", effectiveNav: 118.93 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Fund", sellingPrice: 36.8741, buyingPrice: 36.8741, date: "21 Oct 2026", effectiveNav: 36.8741 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Gilt Edged Fund", sellingPrice: 42.7279, buyingPrice: 42.7279, date: "21 Oct 2026", effectiveNav: 42.7279 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Plus Fund", sellingPrice: 34.2406, buyingPrice: 34.2406, date: "21 Oct 2026", effectiveNav: 34.2406 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Plus Fund", sellingPrice: 44.5183, buyingPrice: 44.5183, date: "21 Oct 2026", effectiveNav: 44.5183 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Fund", sellingPrice: 40.3744, buyingPrice: 40.3744, date: "21 Oct 2026", effectiveNav: 40.3744 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Islamic Money Plus Fund", sellingPrice: 27.5199, buyingPrice: 27.5199, date: "21 Oct 2026", effectiveNav: 27.5199 },
  { company: "National Asset Management Limited", fundName: "NAMAL Growth Fund", sellingPrice: 335.3843, buyingPrice: 323.6104, date: "21 Oct 2026", effectiveNav: 323.6104 },
  { company: "National Asset Management Limited", fundName: "National Equity Fund", sellingPrice: 71.6303, buyingPrice: 69.0385, date: "21 Oct 2026", effectiveNav: 69.0385 },
  { company: "National Asset Management Limited", fundName: "NAMAL Income Fund", sellingPrice: 16.2536, buyingPrice: 16.2536, date: "21 Oct 2026", effectiveNav: 16.2536 },
  { company: "National Asset Management Limited", fundName: "NAMAL High Yield Fund", sellingPrice: 48.7564, buyingPrice: 48.7564, date: "21 Oct 2026", effectiveNav: 48.7564 },
  { company: "Premier Wealth Management Limited", fundName: "Premier Money Market Fund", sellingPrice: 35.6769, buyingPrice: 35.6769, date: "21 Oct 2026", effectiveNav: 35.6769 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Growth Fund", sellingPrice: 25.32, buyingPrice: 24.45, date: "21 Oct 2026", effectiveNav: 24.45 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Shariah Balanced Fund", sellingPrice: 20.4, buyingPrice: 19.79, date: "21 Oct 2026", effectiveNav: 19.79 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Money Market Fund", sellingPrice: 30.3967, buyingPrice: 30.3967, date: "21 Oct 2026", effectiveNav: 30.3967 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Dynamic Income Fund", sellingPrice: 23.7355, buyingPrice: 23.7355, date: "21 Oct 2026", effectiveNav: 23.7355 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Shariah Income Fund", sellingPrice: 19.688, buyingPrice: 19.688, date: "21 Oct 2026", effectiveNav: 19.688 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Dividend Fund", sellingPrice: 19.0075, buyingPrice: 18.6113, date: "21 Oct 2026", effectiveNav: 18.6113 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Select Factor Fund", sellingPrice: 12.77, buyingPrice: 12.51, date: "21 Oct 2026", effectiveNav: 12.51 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Consumer Staples Fund", sellingPrice: 19.87, buyingPrice: 19.47, date: "21 Oct 2026", effectiveNav: 19.47 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Financial Services Fund", sellingPrice: 21.04, buyingPrice: 20.62, date: "21 Oct 2026", effectiveNav: 20.62 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Insurance Sector Fund", sellingPrice: 18.09, buyingPrice: 17.73, date: "21 Oct 2026", effectiveNav: 17.73 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Money Market Fund", sellingPrice: 195.8962, buyingPrice: 195.8962, date: "21 Oct 2026", effectiveNav: 195.8962 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Equity Fund", sellingPrice: 254.1002, buyingPrice: 241.4575, date: "21 Oct 2026", effectiveNav: 241.4575 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Income Fund", sellingPrice: 104.1467, buyingPrice: 104.1467, date: "21 Oct 2026", effectiveNav: 104.1467 }
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

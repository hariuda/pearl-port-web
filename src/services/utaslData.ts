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
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Cash Management Trust Fund", sellingPrice: 47.3732, buyingPrice: 47.3732, date: "30 Oct 2026", effectiveNav: 47.3732 },
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Equity Income Fund", sellingPrice: 16.6929, buyingPrice: 16.3382, date: "30 Oct 2026", effectiveNav: 16.3382 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Money Market Fund", sellingPrice: 12.4083, buyingPrice: 12.4083, date: "30 Oct 2026", effectiveNav: 12.4083 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Active Income Fund", sellingPrice: 222.8717, buyingPrice: 222.8717, date: "30 Oct 2026", effectiveNav: 222.8717 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "Astrue Alpha Fund", sellingPrice: 30.9944, buyingPrice: 29.1443, date: "30 Oct 2026", effectiveNav: 29.1443 },
  { company: "Assetline Capital (Pvt) Ltd", fundName: "Assetline Income Fund", sellingPrice: 31.3658, buyingPrice: 31.3658, date: "30 Oct 2026", effectiveNav: 31.3658 },
  { company: "Assetline Capital (Pvt) Ltd", fundName: "Assetline Income Plus Growth Fund", sellingPrice: 30.9102, buyingPrice: 30.484, date: "30 Oct 2026", effectiveNav: 30.484 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Equity Fund", sellingPrice: 69.22, buyingPrice: 65.84, date: "30 Oct 2026", effectiveNav: 65.84 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Gilt-Edged Fund", sellingPrice: 18.7435, buyingPrice: 18.7435, date: "30 Oct 2026", effectiveNav: 18.7435 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith High Yield Fund", sellingPrice: 21.5028, buyingPrice: 21.5028, date: "30 Oct 2026", effectiveNav: 21.5028 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Growth Equity Fund", sellingPrice: 42.7875, buyingPrice: 41.8673, date: "30 Oct 2026", effectiveNav: 41.8673 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Income Fund", sellingPrice: 19.2565, buyingPrice: 19.2565, date: "30 Oct 2026", effectiveNav: 19.2565 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Money Market Fund", sellingPrice: 36.4848, buyingPrice: 36.4848, date: "30 Oct 2026", effectiveNav: 36.4848 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Unit Trust", sellingPrice: 47.79, buyingPrice: 45.71, date: "30 Oct 2026", effectiveNav: 45.71 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Century Growth", sellingPrice: 169.52, buyingPrice: 162.42, date: "30 Oct 2026", effectiveNav: 162.42 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Savings Plus Money Market Fund", sellingPrice: 19.9432, buyingPrice: 19.9432, date: "30 Oct 2026", effectiveNav: 19.9432 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Surakum Fund", sellingPrice: 24.0863, buyingPrice: 24.0863, date: "30 Oct 2026", effectiveNav: 24.0863 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Gilt Edge Fund (A Series)", sellingPrice: 25.7296, buyingPrice: 25.7296, date: "30 Oct 2026", effectiveNav: 25.7296 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank High Yield Fund", sellingPrice: 26.9549, buyingPrice: 26.9549, date: "30 Oct 2026", effectiveNav: 26.9549 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Equity Fund (FCEF)", sellingPrice: 4207.09, buyingPrice: 4143.98, date: "30 Oct 2026", effectiveNav: 4143.98 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Fixed income Fund", sellingPrice: 4649.15, buyingPrice: 4649.15, date: "30 Oct 2026", effectiveNav: 4649.15 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Gilt Edged Fund", sellingPrice: 2817.21, buyingPrice: 2817.21, date: "30 Oct 2026", effectiveNav: 2817.21 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Market Fund", sellingPrice: 3819.99, buyingPrice: 3819.99, date: "30 Oct 2026", effectiveNav: 3819.99 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Wealth Fund", sellingPrice: 2322.92, buyingPrice: 2322.92, date: "30 Oct 2026", effectiveNav: 2322.92 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Plus Fund", sellingPrice: 1218.11, buyingPrice: 1218.11, date: "30 Oct 2026", effectiveNav: 1218.11 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Credit Opportunity Fund", sellingPrice: 10.7312, buyingPrice: 10.7312, date: "30 Oct 2026", effectiveNav: 10.7312 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Money Market Fund", sellingPrice: 56.2914, buyingPrice: 56.2914, date: "30 Oct 2026", effectiveNav: 56.2914 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Short Term Gilt Fund", sellingPrice: 30.0599, buyingPrice: 30.0599, date: "30 Oct 2026", effectiveNav: 30.0599 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Value Equity Fund", sellingPrice: 81.3881, buyingPrice: 77.2852, date: "30 Oct 2026", effectiveNav: 77.2852 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Dynamic Opportunities Fund", sellingPrice: 296.9522, buyingPrice: 282.4805, date: "30 Oct 2026", effectiveNav: 282.4805 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Income Fund", sellingPrice: 188.8512, buyingPrice: 185.0708, date: "30 Oct 2026", effectiveNav: 185.0708 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Liquid Money Fund", sellingPrice: 118.8426, buyingPrice: 118.8426, date: "30 Oct 2026", effectiveNav: 118.8426 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Optimal Yield Fund", sellingPrice: 106.4206, buyingPrice: 104.2918, date: "30 Oct 2026", effectiveNav: 104.2918 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth Fund", sellingPrice: 22.41, buyingPrice: 21.93, date: "30 Oct 2026", effectiveNav: 21.93 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth & Income Fund", sellingPrice: 122.54, buyingPrice: 119.94, date: "30 Oct 2026", effectiveNav: 119.94 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Fund", sellingPrice: 36.9581, buyingPrice: 36.9581, date: "30 Oct 2026", effectiveNav: 36.9581 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Gilt Edged Fund", sellingPrice: 42.5611, buyingPrice: 42.5611, date: "30 Oct 2026", effectiveNav: 42.5611 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Plus Fund", sellingPrice: 34.3281, buyingPrice: 34.3281, date: "30 Oct 2026", effectiveNav: 34.3281 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Plus Fund", sellingPrice: 44.6143, buyingPrice: 44.6143, date: "30 Oct 2026", effectiveNav: 44.6143 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Fund", sellingPrice: 40.462, buyingPrice: 40.462, date: "30 Oct 2026", effectiveNav: 40.462 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Islamic Money Plus Fund", sellingPrice: 27.5767, buyingPrice: 27.5767, date: "30 Oct 2026", effectiveNav: 27.5767 },
  { company: "National Asset Management Limited", fundName: "NAMAL Growth Fund", sellingPrice: 335.4373, buyingPrice: 323.5777, date: "30 Oct 2026", effectiveNav: 323.5777 },
  { company: "National Asset Management Limited", fundName: "National Equity Fund", sellingPrice: 72.0577, buyingPrice: 69.4316, date: "30 Oct 2026", effectiveNav: 69.4316 },
  { company: "National Asset Management Limited", fundName: "NAMAL Income Fund", sellingPrice: 16.2938, buyingPrice: 16.2938, date: "30 Oct 2026", effectiveNav: 16.2938 },
  { company: "National Asset Management Limited", fundName: "NAMAL High Yield Fund", sellingPrice: 48.8778, buyingPrice: 48.8778, date: "30 Oct 2026", effectiveNav: 48.8778 },
  { company: "Premier Wealth Management Limited", fundName: "Premier Money Market Fund", sellingPrice: 35.7574, buyingPrice: 35.7574, date: "30 Oct 2026", effectiveNav: 35.7574 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Money Market Fund", sellingPrice: 30.4652, buyingPrice: 30.4652, date: "30 Oct 2026", effectiveNav: 30.4652 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Dynamic Income Fund", sellingPrice: 23.7695, buyingPrice: 23.7695, date: "30 Oct 2026", effectiveNav: 23.7695 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Shariah Income Fund", sellingPrice: 19.7301, buyingPrice: 19.7301, date: "30 Oct 2026", effectiveNav: 19.7301 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Growth Fund", sellingPrice: 25.54, buyingPrice: 24.66, date: "30 Oct 2026", effectiveNav: 24.66 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Shariah Balanced Fund", sellingPrice: 20.55, buyingPrice: 19.93, date: "30 Oct 2026", effectiveNav: 19.93 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Dividend Fund", sellingPrice: 19.6849, buyingPrice: 19.2845, date: "30 Oct 2026", effectiveNav: 19.2845 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Select Factor Fund", sellingPrice: 12.97, buyingPrice: 12.71, date: "30 Oct 2026", effectiveNav: 12.71 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Consumer Staples Fund", sellingPrice: 20.16, buyingPrice: 19.75, date: "30 Oct 2026", effectiveNav: 19.75 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Financial Services Fund", sellingPrice: 21.41, buyingPrice: 20.99, date: "30 Oct 2026", effectiveNav: 20.99 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Insurance Sector Fund", sellingPrice: 18.05, buyingPrice: 17.69, date: "30 Oct 2026", effectiveNav: 17.69 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Money Market Fund", sellingPrice: 196.3468, buyingPrice: 196.3468, date: "30 Oct 2026", effectiveNav: 196.3468 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Equity Fund", sellingPrice: 255.0578, buyingPrice: 242.052, date: "30 Oct 2026", effectiveNav: 242.052 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Income Fund", sellingPrice: 104.4243, buyingPrice: 104.4243, date: "30 Oct 2026", effectiveNav: 104.4243 }
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

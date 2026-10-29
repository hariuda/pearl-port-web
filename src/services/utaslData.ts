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
  "Astrue Alpha Fund",
  "CEYLON Index Fund",
  "CT Smith Equity Fund",
  "CT Smith Gilt-Edged Fund",
  "CT Smith High Yield Fund",
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
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Cash Management Trust Fund", sellingPrice: 47.3474, buyingPrice: 47.3474, date: "28 Oct 2026", effectiveNav: 47.3474 },
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Equity Income Fund", sellingPrice: 16.6028, buyingPrice: 16.2502, date: "28 Oct 2026", effectiveNav: 16.2502 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "Astrue Alpha Fund", sellingPrice: 30.692, buyingPrice: 28.8587, date: "28 Oct 2026", effectiveNav: 28.8587 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Money Market Fund", sellingPrice: 12.3963, buyingPrice: 12.3963, date: "28 Oct 2026", effectiveNav: 12.3963 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Active Income Fund", sellingPrice: 222.6883, buyingPrice: 222.6883, date: "28 Oct 2026", effectiveNav: 222.6883 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Equity Fund", sellingPrice: 68.51, buyingPrice: 65.16, date: "28 Oct 2026", effectiveNav: 65.16 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Gilt-Edged Fund", sellingPrice: 18.7366, buyingPrice: 18.7366, date: "28 Oct 2026", effectiveNav: 18.7366 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith High Yield Fund", sellingPrice: 21.4922, buyingPrice: 21.4922, date: "28 Oct 2026", effectiveNav: 21.4922 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Money Market Fund", sellingPrice: 32.0541, buyingPrice: 32.0541, date: "28 Oct 2026", effectiveNav: 32.0541 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Treasury Income Fund", sellingPrice: 6.8206, buyingPrice: 6.8206, date: "28 Oct 2026", effectiveNav: 6.8206 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Income Fund", sellingPrice: 38.3752, buyingPrice: 38.3752, date: "28 Oct 2026", effectiveNav: 38.3752 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Dollar Bond Fund (in $ )", sellingPrice: 1.1873, buyingPrice: 1.1814, date: "28 Oct 2026", effectiveNav: 1.1814 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Wealth Plus Fund", sellingPrice: 13.3541, buyingPrice: 13.3541, date: "28 Oct 2026", effectiveNav: 13.3541 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Tourism Fund", sellingPrice: 4.59, buyingPrice: 4.4, date: "28 Oct 2026", effectiveNav: 4.4 },
  { company: "Ceylon Asset Management Limited", fundName: "CEYLON Index Fund", sellingPrice: 122.41, buyingPrice: 117.38, date: "28 Oct 2026", effectiveNav: 117.38 },
  { company: "Ceylon Asset Management Limited", fundName: "Ceylon Financial Sector Fund", sellingPrice: 18.66, buyingPrice: 17.87, date: "28 Oct 2026", effectiveNav: 17.87 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Equity Fund (FCEF)", sellingPrice: 4177.56, buyingPrice: 4114.9, date: "28 Oct 2026", effectiveNav: 4114.9 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Fixed income Fund", sellingPrice: 4646.52, buyingPrice: 4646.52, date: "28 Oct 2026", effectiveNav: 4646.52 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Gilt Edged Fund", sellingPrice: 2823.62, buyingPrice: 2823.62, date: "28 Oct 2026", effectiveNav: 2823.62 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Market Fund", sellingPrice: 3818.81, buyingPrice: 3818.81, date: "28 Oct 2026", effectiveNav: 3818.81 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Wealth Fund", sellingPrice: 2331.59, buyingPrice: 2331.59, date: "28 Oct 2026", effectiveNav: 2331.59 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Plus Fund", sellingPrice: 1217.56, buyingPrice: 1217.56, date: "28 Oct 2026", effectiveNav: 1217.56 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Credit Opportunity Fund", sellingPrice: 10.7251, buyingPrice: 10.7251, date: "28 Oct 2026", effectiveNav: 10.7251 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Money Market Fund", sellingPrice: 56.2621, buyingPrice: 56.2621, date: "28 Oct 2026", effectiveNav: 56.2621 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Short Term Gilt Fund", sellingPrice: 30.0453, buyingPrice: 30.0453, date: "28 Oct 2026", effectiveNav: 30.0453 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Value Equity Fund", sellingPrice: 80.8236, buyingPrice: 76.7719, date: "28 Oct 2026", effectiveNav: 76.7719 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Dynamic Opportunities Fund", sellingPrice: 295.5569, buyingPrice: 281.1245, date: "28 Oct 2026", effectiveNav: 281.1245 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Income Fund", sellingPrice: 188.8593, buyingPrice: 185.0789, date: "28 Oct 2026", effectiveNav: 185.0789 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Liquid Money Fund", sellingPrice: 118.783, buyingPrice: 118.783, date: "28 Oct 2026", effectiveNav: 118.783 },
  { company: "LYNEAR Wealth Mangament (Pvt) Ltd", fundName: "LYNEAR Wealth Optimal Yield Fund", sellingPrice: 106.4903, buyingPrice: 104.36, date: "28 Oct 2026", effectiveNav: 104.36 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth Fund", sellingPrice: 22.24, buyingPrice: 21.76, date: "28 Oct 2026", effectiveNav: 21.76 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth & Income Fund", sellingPrice: 122.06, buyingPrice: 119.46, date: "28 Oct 2026", effectiveNav: 119.46 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Fund", sellingPrice: 36.9399, buyingPrice: 36.9399, date: "28 Oct 2026", effectiveNav: 36.9399 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Gilt Edged Fund", sellingPrice: 42.7857, buyingPrice: 42.7857, date: "28 Oct 2026", effectiveNav: 42.7857 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Plus Fund", sellingPrice: 34.3086, buyingPrice: 34.3086, date: "28 Oct 2026", effectiveNav: 34.3086 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Plus Fund", sellingPrice: 44.5929, buyingPrice: 44.5929, date: "28 Oct 2026", effectiveNav: 44.5929 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Fund", sellingPrice: 40.4425, buyingPrice: 40.4425, date: "28 Oct 2026", effectiveNav: 40.4425 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Islamic Money Plus Fund", sellingPrice: 27.564, buyingPrice: 27.564, date: "28 Oct 2026", effectiveNav: 27.564 },
  { company: "National Asset Management Limited", fundName: "NAMAL Growth Fund", sellingPrice: 333.7094, buyingPrice: 321.9116, date: "28 Oct 2026", effectiveNav: 321.9116 },
  { company: "National Asset Management Limited", fundName: "National Equity Fund", sellingPrice: 71.4665, buyingPrice: 68.8645, date: "28 Oct 2026", effectiveNav: 68.8645 },
  { company: "National Asset Management Limited", fundName: "NAMAL Income Fund", sellingPrice: 16.2847, buyingPrice: 16.2846, date: "28 Oct 2026", effectiveNav: 16.2846 },
  { company: "National Asset Management Limited", fundName: "NAMAL High Yield Fund", sellingPrice: 48.8507, buyingPrice: 48.8507, date: "28 Oct 2026", effectiveNav: 48.8507 },
  { company: "Premier Wealth Management Limited", fundName: "Premier Money Market Fund", sellingPrice: 35.7395, buyingPrice: 35.7395, date: "28 Oct 2026", effectiveNav: 35.7395 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Money Market Fund", sellingPrice: 30.4503, buyingPrice: 30.4503, date: "28 Oct 2026", effectiveNav: 30.4503 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Shariah Income Fund", sellingPrice: 19.7152, buyingPrice: 19.7152, date: "28 Oct 2026", effectiveNav: 19.7152 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Dynamic Income Fund", sellingPrice: 23.7803, buyingPrice: 23.7803, date: "28 Oct 2026", effectiveNav: 23.7803 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Select Factor Fund", sellingPrice: 12.82, buyingPrice: 12.56, date: "28 Oct 2026", effectiveNav: 12.56 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Growth Fund", sellingPrice: 25.35, buyingPrice: 24.49, date: "28 Oct 2026", effectiveNav: 24.49 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Consumer Staples Fund", sellingPrice: 20.04, buyingPrice: 19.64, date: "28 Oct 2026", effectiveNav: 19.64 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Dividend Fund", sellingPrice: 19.5895, buyingPrice: 19.193, date: "28 Oct 2026", effectiveNav: 19.193 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Insurance Sector Fund", sellingPrice: 17.97, buyingPrice: 17.61, date: "28 Oct 2026", effectiveNav: 17.61 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Shariah Balanced Fund", sellingPrice: 20.5, buyingPrice: 19.89, date: "28 Oct 2026", effectiveNav: 19.89 },
  { company: "Senfin Asset Management (Pvt) Ltd", fundName: "Senfin Financial Services Fund", sellingPrice: 21.15, buyingPrice: 20.73, date: "28 Oct 2026", effectiveNav: 20.73 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Money Market Fund", sellingPrice: 196.2471, buyingPrice: 196.2471, date: "28 Oct 2026", effectiveNav: 196.2471 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Equity Fund", sellingPrice: 252.4138, buyingPrice: 239.6859, date: "28 Oct 2026", effectiveNav: 239.6859 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Income Fund", sellingPrice: 104.3625, buyingPrice: 104.3625, date: "28 Oct 2026", effectiveNav: 104.3625 }
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

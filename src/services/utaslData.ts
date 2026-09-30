import { UtaslFundPrice } from '../types';

/**
 * Official Unit Trust Association of Sri Lanka (UTASL) funds list.
 * Sourced from: https://www.utasl.lk/unit-prices/
 */
export const UTASL_FUNDS: string[] = [
  "Arpico Ataraxia Cash Management Trust Fund",
  "Arpico Ataraxia Equity Income Fund",
  "Asia Securities Dynamic Gilt Fund",
  "Asia Securities Dynamic Income Fund",
  "Asia Securities Equity Opportunity Fund",
  "Asia Securities Gilt Fund",
  "Asia Securities Income Fund",
  "Asia Securities Money Market Fund",
  "Assetline Income Fund",
  "Assetline Income Plus Growth Fund",
  "ASTRUE Active Income Fund",
  "Astrue Alpha Fund",
  "ASTRUE Money Market Fund",
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
  "Ceybank Century Growth",
  "Ceybank Gilt Edge Fund (A Series)",
  "Ceybank High Yield Fund",
  "Ceybank Savings Plus Money Market Fund",
  "Ceybank Surakum Fund",
  "Ceybank Unit Trust",
  "Ceylon Dollar Bond Fund (in $)",
  "Ceylon Dollar Bond Fund (in Rs)",
  "Ceylon Financial Sector Fund",
  "Ceylon Income Fund",
  "Ceylon Index Fund",
  "Ceylon Money Market Fund",
  "Ceylon Tourism Fund",
  "Ceylon Treasury Income Fund",
  "Ceylon Wealth Plus Fund",
  "Comtrust Equity Fund",
  "Comtrust Gilt Edged Fund",
  "Comtrust Money Market Fund",
  "CT Smith Equity Fund",
  "CT Smith Gilt-Edged Fund",
  "CT Smith Growth Equity Fund",
  "CT Smith High Yield Fund",
  "CT Smith Income Fund",
  "CT Smith Money Market Fund",
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
  "National Equity Fund",
  "NDB Wealth Gilt Edged Fund",
  "NDB Wealth Growth & Income Fund",
  "NDB Wealth Growth Fund",
  "NDB Wealth Income Fund",
  "NDB Wealth Income Plus Fund",
  "NDB Wealth Islamic Money Plus Fund",
  "NDB Wealth Money Fund",
  "NDB Wealth Money Plus Fund",
  "Premier Money Market Fund",
  "Premier Wealth Income Fund",
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
  // Arpico Ataraxia
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Cash Management Trust Fund", sellingPrice: 46.9721, buyingPrice: 46.9721, date: "Latest", effectiveNav: 46.9721 },
  { company: "ArpicoAtaraxia Asset Management Pvt Ltd", fundName: "Arpico Ataraxia Equity Income Fund", sellingPrice: 17.2739, buyingPrice: 16.9093, date: "Latest", effectiveNav: 16.9093 },

  // Asset Trust Management
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "Astrue Alpha Fund", sellingPrice: 32.3660, buyingPrice: 30.4406, date: "Latest", effectiveNav: 30.4406 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Active Income Fund", sellingPrice: 221.1653, buyingPrice: 221.1653, date: "Latest", effectiveNav: 221.1653 },
  { company: "Asset Trust Management (Pvt) Ltd", fundName: "ASTRUE Money Market Fund", sellingPrice: 12.3100, buyingPrice: 12.3100, date: "Latest", effectiveNav: 12.3100 },

  // Assetline Capital
  { company: "Assetline Capital (Pvt) Ltd", fundName: "Assetline Income Fund", sellingPrice: 31.1414, buyingPrice: 31.1414, date: "Latest", effectiveNav: 31.1414 },
  { company: "Assetline Capital (Pvt) Ltd", fundName: "Assetline Income Plus Growth Fund", sellingPrice: 31.4254, buyingPrice: 30.9862, date: "Latest", effectiveNav: 30.9862 },

  // CT Smith Asset Management
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Equity Fund", sellingPrice: 70.5500, buyingPrice: 67.1200, date: "Latest", effectiveNav: 67.1200 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Gilt-Edged Fund", sellingPrice: 18.6362, buyingPrice: 18.6362, date: "Latest", effectiveNav: 18.6362 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith High Yield Fund", sellingPrice: 21.3389, buyingPrice: 21.3389, date: "Latest", effectiveNav: 21.3389 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Growth Equity Fund", sellingPrice: 43.5049, buyingPrice: 42.5943, date: "Latest", effectiveNav: 42.5943 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Income Fund", sellingPrice: 19.2250, buyingPrice: 19.2250, date: "Latest", effectiveNav: 19.2250 },
  { company: "CT Smith Asset Management (Pvt) Ltd", fundName: "CT Smith Money Market Fund", sellingPrice: 36.2266, buyingPrice: 36.2266, date: "Latest", effectiveNav: 36.2266 },

  // First Capital Asset Management
  { company: "First Capital Asset Management Limited", fundName: "First Capital Equity Fund (FCEF)", sellingPrice: 4349.7700, buyingPrice: 4284.5200, date: "Latest", effectiveNav: 4284.5200 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Fixed income Fund", sellingPrice: 4608.5600, buyingPrice: 4608.5600, date: "Latest", effectiveNav: 4608.5600 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Gilt Edged Fund", sellingPrice: 2819.9700, buyingPrice: 2819.9700, date: "Latest", effectiveNav: 2819.9700 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Market Fund", sellingPrice: 3792.4700, buyingPrice: 3792.4700, date: "Latest", effectiveNav: 3792.4700 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Wealth Fund", sellingPrice: 2331.9200, buyingPrice: 2331.9200, date: "Latest", effectiveNav: 2331.9200 },
  { company: "First Capital Asset Management Limited", fundName: "First Capital Money Plus Fund", sellingPrice: 1209.6300, buyingPrice: 1209.6300, date: "Latest", effectiveNav: 1209.6300 },

  // JB Vantage / Financial Services
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Credit Opportunity Fund", sellingPrice: 10.6355, buyingPrice: 10.6355, date: "Latest", effectiveNav: 10.6355 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Money Market Fund", sellingPrice: 55.8454, buyingPrice: 55.8454, date: "Latest", effectiveNav: 55.8454 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Short Term Gilt Fund", sellingPrice: 29.8348, buyingPrice: 29.8348, date: "Latest", effectiveNav: 29.8348 },
  { company: "JB Financial (Pvt) Ltd", fundName: "JB Vantage Value Equity Fund", sellingPrice: 82.9954, buyingPrice: 78.8056, date: "Latest", effectiveNav: 78.8056 },

  // LYNEAR Wealth Management
  { company: "LYNEAR Wealth Management (Pvt) Ltd", fundName: "LYNEAR Wealth Dynamic Opportunities Fund", sellingPrice: 308.8773, buyingPrice: 293.5582, date: "Latest", effectiveNav: 293.5582 },
  { company: "LYNEAR Wealth Management (Pvt) Ltd", fundName: "LYNEAR Wealth Income Fund", sellingPrice: 187.6203, buyingPrice: 183.8646, date: "Latest", effectiveNav: 183.8646 },
  { company: "LYNEAR Wealth Management (Pvt) Ltd", fundName: "LYNEAR Wealth Liquid Money Fund", sellingPrice: 117.9342, buyingPrice: 117.9342, date: "Latest", effectiveNav: 117.9342 },
  { company: "LYNEAR Wealth Management (Pvt) Ltd", fundName: "LYNEAR Wealth Optimal Yield Fund", sellingPrice: 105.9177, buyingPrice: 103.7988, date: "Latest", effectiveNav: 103.7988 },

  // NDB Wealth Management
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth Fund", sellingPrice: 22.9700, buyingPrice: 22.4900, date: "Latest", effectiveNav: 22.4900 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Growth & Income Fund", sellingPrice: 125.0200, buyingPrice: 122.4500, date: "Latest", effectiveNav: 122.4500 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Fund", sellingPrice: 36.6752, buyingPrice: 36.6752, date: "Latest", effectiveNav: 36.6752 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Gilt Edged Fund", sellingPrice: 42.9120, buyingPrice: 42.9120, date: "Latest", effectiveNav: 42.9120 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Income Plus Fund", sellingPrice: 34.0260, buyingPrice: 34.0260, date: "Latest", effectiveNav: 34.0260 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Plus Fund", sellingPrice: 44.2937, buyingPrice: 44.2937, date: "Latest", effectiveNav: 44.2937 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Money Fund", sellingPrice: 40.1597, buyingPrice: 40.1597, date: "Latest", effectiveNav: 40.1597 },
  { company: "NDB Wealth Management Ltd", fundName: "NDB Wealth Islamic Money Plus Fund", sellingPrice: 27.3836, buyingPrice: 27.3836, date: "Latest", effectiveNav: 27.3836 },

  // National Asset Management (NAMAL)
  { company: "National Asset Management Limited", fundName: "NAMAL Growth Fund", sellingPrice: 346.9749, buyingPrice: 334.8411, date: "Latest", effectiveNav: 334.8411 },
  { company: "National Asset Management Limited", fundName: "National Equity Fund", sellingPrice: 75.0121, buyingPrice: 72.2760, date: "Latest", effectiveNav: 72.2760 },
  { company: "National Asset Management Limited", fundName: "NAMAL Income Fund", sellingPrice: 16.1670, buyingPrice: 16.1670, date: "Latest", effectiveNav: 16.1670 },
  { company: "National Asset Management Limited", fundName: "NAMAL High Yield Fund", sellingPrice: 48.4592, buyingPrice: 48.4592, date: "Latest", effectiveNav: 48.4592 },

  // Premier Asset Management
  { company: "Premier Wealth Management Limited", fundName: "Premier Money Market Fund", sellingPrice: 35.4837, buyingPrice: 35.4837, date: "Latest", effectiveNav: 35.4837 },
  { company: "Premier Wealth Management Limited", fundName: "Premier Wealth Income Fund", sellingPrice: 26.4300, buyingPrice: 26.4300, date: "Latest", effectiveNav: 26.4300 },

  // Senfin Asset Management
  { company: "Senfin Asset Management Ltd", fundName: "Senfin Money Market Fund", sellingPrice: 30.2308, buyingPrice: 30.2308, date: "Latest", effectiveNav: 30.2308 },
  { company: "Senfin Asset Management Ltd", fundName: "Senfin Shariah Income Fund", sellingPrice: 19.5808, buyingPrice: 19.5808, date: "Latest", effectiveNav: 19.5808 },
  { company: "Senfin Asset Management Ltd", fundName: "Senfin Dynamic Income Fund", sellingPrice: 23.6550, buyingPrice: 23.6550, date: "Latest", effectiveNav: 23.6550 },
  { company: "Senfin Asset Management Ltd", fundName: "Senfin Growth Fund", sellingPrice: 26.1300, buyingPrice: 25.2300, date: "Latest", effectiveNav: 25.2300 },
  { company: "Senfin Asset Management Ltd", fundName: "Senfin Shariah Balanced Fund", sellingPrice: 20.9400, buyingPrice: 20.3100, date: "Latest", effectiveNav: 20.3100 },
  { company: "Senfin Asset Management Ltd", fundName: "Senfin Dividend Fund", sellingPrice: 20.1339, buyingPrice: 19.7248, date: "Latest", effectiveNav: 19.7248 },
  { company: "Senfin Asset Management Ltd", fundName: "Senfin Consumer Staples Fund", sellingPrice: 20.6500, buyingPrice: 20.2300, date: "Latest", effectiveNav: 20.2300 },
  { company: "Senfin Asset Management Ltd", fundName: "Senfin Financial Services Fund", sellingPrice: 21.7700, buyingPrice: 21.3200, date: "Latest", effectiveNav: 21.3200 },
  { company: "Senfin Asset Management Ltd", fundName: "Senfin Insurance Sector Fund", sellingPrice: 18.5800, buyingPrice: 18.2100, date: "Latest", effectiveNav: 18.2100 },
  { company: "Senfin Asset Management Ltd", fundName: "Senfin Select Factor Fund", sellingPrice: 13.1300, buyingPrice: 12.8600, date: "Latest", effectiveNav: 12.8600 },

  // Softlogic Asset Management
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Money Market Fund", sellingPrice: 194.7723, buyingPrice: 194.7723, date: "Latest", effectiveNav: 194.7723 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Equity Fund", sellingPrice: 274.7119, buyingPrice: 261.1329, date: "Latest", effectiveNav: 261.1329 },
  { company: "Softlogic Asset Management (Pvt) Ltd", fundName: "Softlogic Income Fund", sellingPrice: 103.4765, buyingPrice: 103.4765, date: "Latest", effectiveNav: 103.4765 },

  // CAL Asset Management
  { company: "CAL Asset Management Ltd", fundName: "CAL Balanced Fund", sellingPrice: 35.0700, buyingPrice: 34.4500, date: "Latest", effectiveNav: 34.4500 },
  { company: "CAL Asset Management Ltd", fundName: "CAL Income Fund", sellingPrice: 33.7845, buyingPrice: 33.7845, date: "Latest", effectiveNav: 33.7845 },
  { company: "CAL Asset Management Ltd", fundName: "CAL High Yield Fund", sellingPrice: 27.8420, buyingPrice: 27.8420, date: "Latest", effectiveNav: 27.8420 },
  { company: "CAL Asset Management Ltd", fundName: "CAL Gilt Fund", sellingPrice: 25.1320, buyingPrice: 25.1320, date: "Latest", effectiveNav: 25.1320 },
  { company: "CAL Asset Management Ltd", fundName: "CAL Money Market Fund", sellingPrice: 7.3978, buyingPrice: 7.3978, date: "Latest", effectiveNav: 7.3978 },
  { company: "CAL Asset Management Ltd", fundName: "CAL Investment Grade Fund", sellingPrice: 26.1400, buyingPrice: 26.1400, date: "Latest", effectiveNav: 26.1400 },
  { company: "CAL Asset Management Ltd", fundName: "CAL Corporate Treasury Fund", sellingPrice: 31.2500, buyingPrice: 31.2500, date: "Latest", effectiveNav: 31.2500 },
  { company: "CAL Asset Management Ltd", fundName: "CAL Fixed Income Opportunities Fund", sellingPrice: 25.0400, buyingPrice: 25.0400, date: "Latest", effectiveNav: 25.0400 },

  // Ceybank Asset Management
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Century Growth", sellingPrice: 178.7500, buyingPrice: 171.0200, date: "Latest", effectiveNav: 171.0200 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Century Growth Fund", sellingPrice: 178.7500, buyingPrice: 171.0200, date: "Latest", effectiveNav: 171.0200 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Unit Trust", sellingPrice: 50.6200, buyingPrice: 48.4100, date: "Latest", effectiveNav: 48.4100 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Savings Plus Money Market Fund", sellingPrice: 19.7374, buyingPrice: 19.7374, date: "Latest", effectiveNav: 19.7374 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Surakum Fund", sellingPrice: 23.8783, buyingPrice: 23.8783, date: "Latest", effectiveNav: 23.8783 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank Gilt Edge Fund (A Series)", sellingPrice: 25.4339, buyingPrice: 25.4339, date: "Latest", effectiveNav: 25.4339 },
  { company: "Ceybank Asset Management Ltd", fundName: "Ceybank High Yield Fund", sellingPrice: 26.6098, buyingPrice: 26.6098, date: "Latest", effectiveNav: 26.6098 }
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
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rowMatch;
  while ((rowMatch = rowRegex.exec(html)) !== null) {
    const rowContent = rowMatch[1];
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const cells: string[] = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
      cells.push(cellMatch[1].replace(/<[^>]+>/g, '').trim());
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
          date: 'Live'
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

export async function fetchUtaslFundPrices(): Promise<UtaslFundPrice[]> {
  // If recently fetched in memory, reuse
  if (cachedLiveFunds && cachedLiveFunds.length > 0 && Date.now() - lastUtaslFetchTime < 30000) {
    return cachedLiveFunds;
  }

  const endpoints = [
    '/api/utasl/unit-prices/',
    '/api/utasl',
    'https://www.utasl.lk/unit-prices/'
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(url, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const html = await res.text();
        const parsed = parseUtaslHtml(html);
        if (parsed.length > 10) {
          const merged = mergeFundLists(parsed, fallbackUtaslFunds);
          cachedLiveFunds = merged;
          lastUtaslFetchTime = Date.now();
          try {
            localStorage.setItem('pearlport_cached_utasl_funds', JSON.stringify(merged));
          } catch {}
          return merged;
        }
      }
    } catch {
      // Continue to next endpoint
    }
  }

  // If live fetch fails, check localStorage cache
  if (!cachedLiveFunds) {
    try {
      const stored = localStorage.getItem('pearlport_cached_utasl_funds');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cachedLiveFunds = parsed;
          return parsed;
        }
      }
    } catch {}
  }

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
        cachedLiveFunds = parsed;
        return parsed;
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
    // If one contains 'income' and the other has 'growth' but not vice versa, penalize heavily
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

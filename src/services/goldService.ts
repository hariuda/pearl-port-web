/**
 * Gold rates service integrated with Ran Lanka Gold Buyer (https://ranlankagoldbuyer.com/gold-rate/)
 * 
 * Rates are quoted for 1 Pawn / Sovereign = 8.0 grams.
 * Standard Purity Multipliers:
 *  - 24KT: 1.000 (99.9% fine gold)
 *  - 22KT: 0.916 (91.6% hallmark gold)
 *  - 21KT: 0.875 (87.5% sovereign coin gold)
 *  - 20KT: 0.833 (83.3% gold)
 *  - 18KT: 0.750 (75.0% 750 hallmark gold)
 *  - 14KT: 0.583 (58.3% 585 hallmark gold)
 *  - 9KT:  0.375 (37.5% 375 hallmark gold)
 */

export interface PurityRate {
  purity: string; // e.g. '24KT', '22KT'
  name: string;
  ratio: number;
  pawnBid: number; // LKR per 1 pawn (8g) - Buying rate from customer
  pawnAsk: number; // LKR per 1 pawn (8g) - Selling rate
  gramBid: number; // LKR per 1 gram
  gramAsk: number; // LKR per 1 gram
}

export interface RanLankaGoldRates {
  kt24Bid: number; // Base 24KT buying rate per pawn (8g)
  kt24Ask: number; // Base 24KT selling rate per pawn (8g)
  lastUpdated: string;
  source: 'supabase_live' | 'edge_function' | 'cache' | 'fallback';
  purities: Record<string, PurityRate>;
}

export const GOLD_PURITIES: Array<{ key: string; label: string; ratio: number; desc: string }> = [
  { key: '24KT', label: '24KT (99.9% Pure)', ratio: 1.000, desc: 'Fine Gold / Bullion / 999' },
  { key: '22KT', label: '22KT (91.6% Sovereign)', ratio: 0.916, desc: '916 Hallmark / Jewelry' },
  { key: '21KT', label: '21KT (87.5% Coin)', ratio: 0.875, desc: 'Traditional Sovereign' },
  { key: '20KT', label: '20KT (83.3% Standard)', ratio: 0.833, desc: 'Estate Gold' },
  { key: '18KT', label: '18KT (75.0% Hallmark)', ratio: 0.750, desc: '750 Hallmark / Diamond Jewelry' },
  { key: '14KT', label: '14KT (58.3% Modern)', ratio: 0.583, desc: '585 Hallmark' },
  { key: '9KT',  label: '9KT (37.5% Low Karat)', ratio: 0.375, desc: '375 Hallmark' },
];

const SUPABASE_URL = 'https://ecyqledjewhrvhcwatce.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjeXFsZWRqZXdocnZoY3dhdGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDk1NjMsImV4cCI6MjA3MTA4NTU2M30.jwMrj5CnR-s4AT9S885RDRhaVz5DaFIcO6mHAsCLtzU';

// 2026 Live Baseline Rates for Ran Lanka
const DEFAULT_24KT_BID = 356000; // LKR 356,000 / pawn (8g)
const DEFAULT_24KT_ASK = 380000; // LKR 380,000 / pawn (8g)

const STORAGE_KEY = 'pearl_port_ranlanka_gold_rates';

export function buildPuritiesMap(kt24Bid: number, kt24Ask: number): Record<string, PurityRate> {
  const map: Record<string, PurityRate> = {};
  for (const p of GOLD_PURITIES) {
    const pawnBid = Math.round(kt24Bid * p.ratio);
    const pawnAsk = Math.round(kt24Ask * p.ratio);
    const gramBid = Number((pawnBid / 8.0).toFixed(2));
    const gramAsk = Number((pawnAsk / 8.0).toFixed(2));

    map[p.key] = {
      purity: p.key,
      name: p.label,
      ratio: p.ratio,
      pawnBid,
      pawnAsk,
      gramBid,
      gramAsk,
    };
  }
  return map;
}

export function getFallbackGoldRates(): RanLankaGoldRates {
  // Check local cache first
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.kt24Bid > 0 && parsed.purities) {
        return { ...parsed, source: 'cache' };
      }
    }
  } catch {
    // ignore
  }

  return {
    kt24Bid: DEFAULT_24KT_BID,
    kt24Ask: DEFAULT_24KT_ASK,
    lastUpdated: new Date().toISOString(),
    source: 'fallback',
    purities: buildPuritiesMap(DEFAULT_24KT_BID, DEFAULT_24KT_ASK),
  };
}

/**
 * Fetches live gold rates directly from Ran Lanka Gold Buyer's database.
 * Quoted per 1 pawn (8g).
 */
export async function fetchRanLankaGoldRates(): Promise<RanLankaGoldRates> {
  let kt24Bid = DEFAULT_24KT_BID;
  let kt24Ask = DEFAULT_24KT_ASK;
  let lastUpdated = new Date().toISOString();
  let source: RanLankaGoldRates['source'] = 'fallback';

  // Strategy 1: Direct Supabase Table Query
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/gold_rates?select=kt24_bid_base,kt24_ask_base,updated_at,last_manual_update&order=updated_at.desc&limit=1`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0].kt24_bid_base) {
        kt24Bid = Number(data[0].kt24_bid_base);
        kt24Ask = Number(data[0].kt24_ask_base || Math.round(kt24Bid * 1.067));
        lastUpdated = data[0].last_manual_update || data[0].updated_at || new Date().toISOString();
        source = 'supabase_live';
      }
    }
  } catch (err) {
    console.warn('Direct Supabase gold query error, trying edge function:', err);
  }

  // Strategy 2: Supabase Edge Function fallback
  if (source === 'fallback') {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/fetch-real-gold-rates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.kt24Bid && data.kt24Bid > 0) {
          kt24Bid = Number(data.kt24Bid);
          kt24Ask = Number(data.kt24Ask || Math.round(kt24Bid * 1.067));
          lastUpdated = data.fetchedAt || new Date().toISOString();
          source = 'edge_function';
        }
      }
    } catch (err) {
      console.warn('Edge function gold rates error:', err);
    }
  }

  const purities = buildPuritiesMap(kt24Bid, kt24Ask);
  const result: RanLankaGoldRates = {
    kt24Bid,
    kt24Ask,
    lastUpdated,
    source,
    purities,
  };

  // Cache in localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // ignore
  }

  return result;
}

/**
 * Checks whether an investment is a gold asset.
 */
export function isGoldAsset(type?: string, name?: string, symbol?: string): boolean {
  const t = (type || '').toLowerCase();
  const n = (name || '').toLowerCase();
  const s = (symbol || '').toLowerCase();
  return (
    t.includes('gold') ||
    n.includes('gold') ||
    n.includes('pawn') ||
    n.includes('sovereign') ||
    s.includes('gold') ||
    s.includes('paxg') ||
    s.includes('xau')
  );
}

/**
 * Calculates current price per unit for a given purity and unit ('PAWN' | 'GRAM').
 * Uses bid rate (buying rate in LKR) by default.
 */
export function getGoldPriceForAsset(
  purity: string = '24KT',
  unit: 'PAWN' | 'GRAM' = 'PAWN',
  rates?: RanLankaGoldRates,
  priceType: 'bid' | 'ask' = 'bid'
): number {
  const currentRates = rates || getFallbackGoldRates();
  const normalizedPurity = (purity || '24KT').toUpperCase().replace(/\s+/g, '');
  
  // Find matching purity or default to 24KT
  let matchedRate = currentRates.purities[normalizedPurity];
  if (!matchedRate) {
    // Try matching KT prefix e.g. "22K" -> "22KT"
    const match = normalizedPurity.match(/\d+/);
    if (match) {
      matchedRate = currentRates.purities[`${match[0]}KT`];
    }
  }

  if (!matchedRate) {
    matchedRate = currentRates.purities['24KT'] || {
      purity: '24KT',
      name: '24KT',
      ratio: 1.0,
      pawnBid: DEFAULT_24KT_BID,
      pawnAsk: DEFAULT_24KT_ASK,
      gramBid: DEFAULT_24KT_BID / 8,
      gramAsk: DEFAULT_24KT_ASK / 8,
    };
  }

  if (unit === 'GRAM') {
    return priceType === 'ask' ? matchedRate.gramAsk : matchedRate.gramBid;
  }
  return priceType === 'ask' ? matchedRate.pawnAsk : matchedRate.pawnBid;
}

/**
 * Formats weight nicely:
 * e.g., "3.5 Sovereigns (28g)" or "15.00g (1.88 Sovereigns)"
 */
export function formatGoldWeight(quantity: number, unit: 'PAWN' | 'GRAM' = 'PAWN'): string {
  if (unit === 'PAWN') {
    const grams = (quantity * 8).toFixed(1).replace(/\.0$/, '');
    return `${quantity} ${quantity === 1 ? 'Pawn' : 'Pawns'} (${grams}g)`;
  } else {
    const pawns = (quantity / 8.0).toFixed(2);
    return `${quantity}g (${pawns} ${pawns === '1.00' ? 'Pawn' : 'Pawns'})`;
  }
}

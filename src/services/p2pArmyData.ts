import { P2pArmyPrice } from '../types';

const usdtRates: [string, number, number][] = [
  ["Binance", 323.80, 321.50],
  ["Bybit", 323.40, 321.20],
  ["OKX", 323.00, 320.90],
  ["KuCoin", 322.90, 320.70],
  ["HTX", 323.20, 321.00],
  ["Bitget", 322.70, 320.50],
  ["Gate.io", 322.50, 320.40],
  ["MEXC", 322.60, 320.30],
  ["Market Average", 323.10, 320.95]
];

export function getFallbackP2pRates(): P2pArmyPrice[] {
  const currentDate = new Date().toISOString().split('T')[0];
  const list: P2pArmyPrice[] = [];

  // USDT
  for (const [exchange, buy, sell] of usdtRates) {
    list.push({
      asset: "USDT",
      fiat: "LKR",
      exchange,
      buyPrice: buy,
      sellPrice: sell,
      date: currentDate,
      paymentMethods: ["Bank Transfer", "Commercial Bank", "FriMi", "Sampath Vishwa"],
      effectivePrice: (buy + sell) / 2.0,
      spreadPercent: Math.abs(buy - sell) / sell * 100.0
    });
  }

  // BTC (approx 64,200 USDT)
  const btcMultiplier = 64200.0;
  for (const [exchange, buy, sell] of usdtRates) {
    const bBuy = buy * btcMultiplier;
    const bSell = sell * btcMultiplier;
    list.push({
      asset: "BTC",
      fiat: "LKR",
      exchange,
      buyPrice: bBuy,
      sellPrice: bSell,
      date: currentDate,
      paymentMethods: ["Bank Transfer", "Direct P2P"],
      effectivePrice: (bBuy + bSell) / 2.0,
      spreadPercent: Math.abs(bBuy - bSell) / bSell * 100.0
    });
  }

  // ETH (approx 2,650 USDT)
  const ethMultiplier = 2650.0;
  for (const [exchange, buy, sell] of usdtRates) {
    const eBuy = buy * ethMultiplier;
    const eSell = sell * ethMultiplier;
    list.push({
      asset: "ETH",
      fiat: "LKR",
      exchange,
      buyPrice: eBuy,
      sellPrice: eSell,
      date: currentDate,
      paymentMethods: ["Bank Transfer", "Commercial Bank"],
      effectivePrice: (eBuy + eSell) / 2.0,
      spreadPercent: Math.abs(eBuy - eSell) / eSell * 100.0
    });
  }

  // BNB (approx 580 USDT)
  const bnbMultiplier = 580.0;
  for (const [exchange, buy, sell] of usdtRates) {
    const bnBuy = buy * bnbMultiplier;
    const bnSell = sell * bnbMultiplier;
    list.push({
      asset: "BNB",
      fiat: "LKR",
      exchange,
      buyPrice: bnBuy,
      sellPrice: bnSell,
      date: currentDate,
      paymentMethods: ["Binance Pay", "Bank Transfer"],
      effectivePrice: (bnBuy + bnSell) / 2.0,
      spreadPercent: Math.abs(bnBuy - bnSell) / bnSell * 100.0
    });
  }

  // SOL (approx 148 USDT)
  const solMultiplier = 148.0;
  for (const [exchange, buy, sell] of usdtRates) {
    const sBuy = buy * solMultiplier;
    const sSell = sell * solMultiplier;
    list.push({
      asset: "SOL",
      fiat: "LKR",
      exchange,
      buyPrice: sBuy,
      sellPrice: sSell,
      date: currentDate,
      paymentMethods: ["Bank Transfer"],
      effectivePrice: (sBuy + sSell) / 2.0,
      spreadPercent: Math.abs(sBuy - sSell) / sSell * 100.0
    });
  }

  // USDC (0.999 USDT)
  for (const [exchange, buy, sell] of usdtRates) {
    const uBuy = buy * 0.999;
    const uSell = sell * 0.999;
    list.push({
      asset: "USDC",
      fiat: "LKR",
      exchange,
      buyPrice: uBuy,
      sellPrice: uSell,
      date: currentDate,
      paymentMethods: ["Bank Transfer"],
      effectivePrice: (uBuy + uSell) / 2.0,
      spreadPercent: Math.abs(uBuy - uSell) / uSell * 100.0
    });
  }

  return list;
}

export function findP2pPriceForAsset(
  symbol: string,
  exchangeName: string,
  isPrivateWallet: boolean,
  prices: P2pArmyPrice[] = getFallbackP2pRates()
): P2pArmyPrice | null {
  const cleanSymbol = symbol.trim().toUpperCase();
  if (!cleanSymbol) return null;

  const assetPrices = prices.filter(p => p.asset.toUpperCase() === cleanSymbol);
  if (assetPrices.length === 0) {
    // Derive from USDT for altcoins
    const usdtPrice = findP2pPriceForAsset("USDT", exchangeName, isPrivateWallet, prices);
    if (usdtPrice) {
      return deriveAltcoinP2pPrice(cleanSymbol, exchangeName, usdtPrice);
    }
    return null;
  }

  if (isPrivateWallet || !exchangeName.trim()) {
    return assetPrices.find(p => p.exchange.toLowerCase() === "market average") || assetPrices[0] || null;
  }

  const matched = assetPrices.find(p =>
    p.exchange.toLowerCase().includes(exchangeName.toLowerCase()) ||
    exchangeName.toLowerCase().includes(p.exchange.toLowerCase())
  );

  return matched ||
    assetPrices.find(p => p.exchange.toLowerCase() === "binance") ||
    assetPrices[0] || null;
}

function deriveAltcoinP2pPrice(symbol: string, exchangeName: string, usdtPrice: P2pArmyPrice): P2pArmyPrice {
  let usdRatio = 1.0;
  switch (symbol.toUpperCase()) {
    case 'SOL': usdRatio = 145.50; break;
    case 'XRP': usdRatio = 0.58; break;
    case 'ADA': usdRatio = 0.36; break;
    case 'DOGE': usdRatio = 0.11; break;
    case 'DOT': usdRatio = 4.50; break;
    case 'AVAX': usdRatio = 24.20; break;
    case 'LINK': usdRatio = 11.80; break;
    case 'PAXG': usdRatio = 2520.00; break; // Gold token
    default: usdRatio = 1.0;
  }

  const buy = usdtPrice.buyPrice * usdRatio;
  const sell = usdtPrice.sellPrice * usdRatio;

  return {
    asset: symbol.toUpperCase(),
    fiat: "LKR",
    exchange: exchangeName.trim() || "P2P Market",
    buyPrice: buy,
    sellPrice: sell,
    date: usdtPrice.date,
    paymentMethods: usdtPrice.paymentMethods,
    effectivePrice: (buy + sell) / 2.0,
    spreadPercent: Math.abs(buy - sell) / sell * 100.0
  };
}

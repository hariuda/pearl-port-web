export interface StockPosition {
  id: number;
  symbol: string; // e.g., "COMB.N0000"
  companyName: string;
  quantity: number;
  averagePrice: number;
  sector: string; // e.g., "Banks"
  currentPrice: number;
  totalDividends: number;
  purchaseDate: number;
}

export interface FixedDeposit {
  id: number;
  bankName: string;
  principalAmount: number;
  interestRate: number; // percentage
  maturityDate: number; // timestamp
  isMonthlyInterest: boolean;
  sector: string;
  startDate: number;
  periodMonths: number;
  hasAitDeduction: boolean;
  interestWithdrawn: boolean;
  currentValue?: number;
}

export function calculateAccruedInterest(fd: FixedDeposit): number {
  if (fd.interestWithdrawn) return 0.0;

  const now = Date.now();
  const start = new Date(fd.startDate);
  const current = new Date(now);

  const diffYear = current.getFullYear() - start.getFullYear();
  const diffMonth = diffYear * 12 + current.getMonth() - start.getMonth();

  // Coerce months passed so it doesn't exceed the period
  const monthsPassed = Math.max(0, Math.min(diffMonth, fd.periodMonths));

  let grossInterest = 0.0;
  if (fd.isMonthlyInterest) {
    grossInterest = fd.principalAmount * (fd.interestRate / 100) * (monthsPassed / 12.0);
  } else {
    if (monthsPassed >= fd.periodMonths || now >= fd.maturityDate) {
      grossInterest = fd.principalAmount * (fd.interestRate / 100) * (fd.periodMonths / 12.0);
    } else {
      grossInterest = 0.0;
    }
  }

  return fd.hasAitDeduction ? grossInterest * 0.90 : grossInterest;
}

export function getFdCurrentValue(fd: FixedDeposit): number {
  return fd.principalAmount + calculateAccruedInterest(fd);
}

export interface UnitTrust {
  id: number;
  fundName?: string;
  units: number;
  averageNav: number;
  currentNav: number;
  purchaseDate: number;
  sector: string;
}

export interface Crypto {
  id: number;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  purchaseDate: number;
  isPrivateWallet: boolean;
  exchangeName: string;
  sector: string;
}

export interface OtherInvestment {
  id: number;
  name: string;
  type: string; // e.g. "Gold", "Real Estate"
  value: number;
  purchaseDate: number;
  sector: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  purity?: string; // e.g. "24KT", "22KT", "21KT", "20KT", "18KT", "14KT", "9KT"
  unit?: 'PAWN' | 'GRAM'; // 'PAWN' = 1 Sovereign (8g), 'GRAM' = 1 Gram
}

export interface DividendRecord {
  id: number;
  stockSymbol: string;
  companyName: string;
  amountPerShare: number;
  sharesCount: number;
  totalAmount: number;
  paymentDate: number;
  dividendType: string;
  notes: string;
}

export interface TradeRecord {
  id: number;
  symbol: string;
  companyName: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  tradeDate: number;
}

export interface BackupData {
  positions: StockPosition[];
  fixedDeposits: FixedDeposit[];
  unitTrusts: UnitTrust[];
  crypto: Crypto[];
  otherInvestments: OtherInvestment[];
  dividends: DividendRecord[];
  userName?: string | null;
  chartColorPalette?: string | null;
}

export interface UtaslFundPrice {
  company: string;
  fundName: string;
  sellingPrice: number;
  buyingPrice: number;
  date: string;
  effectiveNav: number;
}

export interface P2pArmyPrice {
  asset: string;
  fiat: string;
  exchange: string;
  buyPrice: number;
  sellPrice: number;
  date: string;
  paymentMethods: string[];
  effectivePrice: number;
  spreadPercent: number;
}

export interface AspiData {
  value: number;
  change: number;
  percentage: number;
}

export type ThemeMode = 'SYSTEM' | 'LIGHT' | 'DARK';

export type PortfolioSortOrder = 'VALUE_DESC' | 'VALUE_ASC' | 'NAME_ASC' | 'GAIN_DESC';

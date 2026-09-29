import {
  StockPosition,
  FixedDeposit,
  UnitTrust,
  Crypto,
  OtherInvestment,
  DividendRecord,
  TradeRecord,
  BackupData
} from '../types';

const STORAGE_KEYS = {
  POSITIONS: 'pearlport_positions',
  FIXED_DEPOSITS: 'pearlport_fixed_deposits',
  UNIT_TRUSTS: 'pearlport_unit_trusts',
  CRYPTO: 'pearlport_crypto',
  OTHER_INVESTMENTS: 'pearlport_other_investments',
  DIVIDENDS: 'pearlport_dividends',
  TRADES: 'pearlport_trades',
  USER_NAME: 'user_name',
  THEME_MODE: 'theme_mode',
  CHART_PALETTE: 'chart_palette'
};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save to localStorage for key ${key}`, e);
  }
}

// Initial demo positions to showcase the app if brand new and empty (matching realistic CSE holdings)
export const initialSamplePositions: StockPosition[] = [
  {
    id: 1,
    symbol: "COMB.N0000",
    companyName: "Commercial Bank of Ceylon PLC",
    quantity: 1200,
    averagePrice: 104.50,
    currentPrice: 118.50,
    sector: "Banks",
    totalDividends: 9600.0,
    purchaseDate: Date.now() - 120 * 86400000
  },
  {
    id: 2,
    symbol: "SAMP.N0000",
    companyName: "Sampath Bank PLC",
    quantity: 1500,
    averagePrice: 84.00,
    currentPrice: 92.50,
    sector: "Banks",
    totalDividends: 6750.0,
    purchaseDate: Date.now() - 90 * 86400000
  },
  {
    id: 3,
    symbol: "JKH.N0000",
    companyName: "John Keells Holdings PLC",
    quantity: 3500,
    averagePrice: 19.80,
    currentPrice: 21.80,
    sector: "Capital Goods",
    totalDividends: 4200.0,
    purchaseDate: Date.now() - 60 * 86400000
  },
  {
    id: 4,
    symbol: "CALT.N0000",
    companyName: "Capital Alliance Limited",
    quantity: 2000,
    averagePrice: 58.00,
    currentPrice: 66.50,
    sector: "Diversified Financials",
    totalDividends: 10000.0,
    purchaseDate: Date.now() - 45 * 86400000
  }
];

export const initialSampleFds: FixedDeposit[] = [
  {
    id: 1,
    bankName: "Commercial Bank of Ceylon",
    principalAmount: 500000.0,
    interestRate: 11.25,
    maturityDate: Date.now() + 180 * 86400000,
    isMonthlyInterest: true,
    sector: "Fixed Deposits",
    startDate: Date.now() - 185 * 86400000,
    periodMonths: 12,
    hasAitDeduction: true,
    interestWithdrawn: false
  },
  {
    id: 2,
    bankName: "Sampath Bank",
    principalAmount: 750000.0,
    interestRate: 10.75,
    maturityDate: Date.now() + 60 * 86400000,
    isMonthlyInterest: false,
    sector: "Fixed Deposits",
    startDate: Date.now() - 305 * 86400000,
    periodMonths: 12,
    hasAitDeduction: false,
    interestWithdrawn: false
  }
];

export const initialSampleUnitTrusts: UnitTrust[] = [
  {
    id: 1,
    fundName: "CAL Balanced Fund",
    units: 12500,
    averageNav: 24.50,
    currentNav: 27.5625,
    purchaseDate: Date.now() - 150 * 86400000,
    sector: "CAL Asset Management Ltd"
  },
  {
    id: 2,
    fundName: "NDB Wealth Growth Fund",
    units: 8000,
    averageNav: 20.80,
    currentNav: 22.90,
    purchaseDate: Date.now() - 80 * 86400000,
    sector: "NDB Wealth Management Ltd"
  }
];

export const initialSampleCrypto: Crypto[] = [
  {
    id: 1,
    symbol: "USDT",
    quantity: 1500,
    averagePrice: 312.00,
    currentPrice: 322.65,
    purchaseDate: Date.now() - 70 * 86400000,
    isPrivateWallet: false,
    exchangeName: "Binance",
    sector: "Crypto"
  },
  {
    id: 2,
    symbol: "BTC",
    quantity: 0.025,
    averagePrice: 18500000.0,
    currentPrice: 20676000.0,
    purchaseDate: Date.now() - 110 * 86400000,
    isPrivateWallet: true,
    exchangeName: "",
    sector: "Crypto"
  }
];

export const initialSampleOther: OtherInvestment[] = [
  {
    id: 1,
    name: "Sovereign Gold Coins",
    type: "Gold",
    value: 650000.0,
    purchaseDate: Date.now() - 200 * 86400000,
    sector: "Gold & Other",
    symbol: "GOLD",
    quantity: 24.0,
    averagePrice: 24500.0,
    currentPrice: 27083.33
  }
];

export const initialSampleDividends: DividendRecord[] = [
  {
    id: 1,
    stockSymbol: "COMB.N0000",
    companyName: "Commercial Bank of Ceylon PLC",
    amountPerShare: 8.0,
    sharesCount: 1200,
    totalAmount: 9600.0,
    paymentDate: Date.now() - 35 * 86400000,
    dividendType: "Cash",
    notes: "Interim Dividend 2026"
  },
  {
    id: 2,
    stockSymbol: "CALT.N0000",
    companyName: "Capital Alliance Limited",
    amountPerShare: 5.0,
    sharesCount: 2000,
    totalAmount: 10000.0,
    paymentDate: Date.now() - 20 * 86400000,
    dividendType: "Cash",
    notes: "First Interim Dividend"
  }
];

export const initialSampleTrades: TradeRecord[] = [
  {
    id: 1,
    symbol: "HNB.N0000",
    companyName: "Hatton National Bank PLC",
    quantity: 500,
    buyPrice: 210.0,
    sellPrice: 234.0,
    tradeDate: Date.now() - 15 * 86400000
  }
];

export class StorageService {
  static getPositions(): StockPosition[] {
    const stored = getItem<StockPosition[] | null>(STORAGE_KEYS.POSITIONS, null);
    if (stored === null) {
      setItem(STORAGE_KEYS.POSITIONS, initialSamplePositions);
      return initialSamplePositions;
    }
    return stored;
  }

  static savePositions(positions: StockPosition[]): void {
    setItem(STORAGE_KEYS.POSITIONS, positions);
  }

  static getFixedDeposits(): FixedDeposit[] {
    const stored = getItem<FixedDeposit[] | null>(STORAGE_KEYS.FIXED_DEPOSITS, null);
    if (stored === null) {
      setItem(STORAGE_KEYS.FIXED_DEPOSITS, initialSampleFds);
      return initialSampleFds;
    }
    return stored;
  }

  static saveFixedDeposits(fds: FixedDeposit[]): void {
    setItem(STORAGE_KEYS.FIXED_DEPOSITS, fds);
  }

  static getUnitTrusts(): UnitTrust[] {
    const stored = getItem<UnitTrust[] | null>(STORAGE_KEYS.UNIT_TRUSTS, null);
    if (stored === null) {
      setItem(STORAGE_KEYS.UNIT_TRUSTS, initialSampleUnitTrusts);
      return initialSampleUnitTrusts;
    }
    return stored;
  }

  static saveUnitTrusts(uts: UnitTrust[]): void {
    setItem(STORAGE_KEYS.UNIT_TRUSTS, uts);
  }

  static getCrypto(): Crypto[] {
    const stored = getItem<Crypto[] | null>(STORAGE_KEYS.CRYPTO, null);
    if (stored === null) {
      setItem(STORAGE_KEYS.CRYPTO, initialSampleCrypto);
      return initialSampleCrypto;
    }
    return stored;
  }

  static saveCrypto(crypto: Crypto[]): void {
    setItem(STORAGE_KEYS.CRYPTO, crypto);
  }

  static getOtherInvestments(): OtherInvestment[] {
    const stored = getItem<OtherInvestment[] | null>(STORAGE_KEYS.OTHER_INVESTMENTS, null);
    if (stored === null) {
      setItem(STORAGE_KEYS.OTHER_INVESTMENTS, initialSampleOther);
      return initialSampleOther;
    }
    return stored;
  }

  static saveOtherInvestments(other: OtherInvestment[]): void {
    setItem(STORAGE_KEYS.OTHER_INVESTMENTS, other);
  }

  static getDividends(): DividendRecord[] {
    const stored = getItem<DividendRecord[] | null>(STORAGE_KEYS.DIVIDENDS, null);
    if (stored === null) {
      setItem(STORAGE_KEYS.DIVIDENDS, initialSampleDividends);
      return initialSampleDividends;
    }
    return stored;
  }

  static saveDividends(divs: DividendRecord[]): void {
    setItem(STORAGE_KEYS.DIVIDENDS, divs);
  }

  static getTradeRecords(): TradeRecord[] {
    const stored = getItem<TradeRecord[] | null>(STORAGE_KEYS.TRADES, null);
    if (stored === null) {
      setItem(STORAGE_KEYS.TRADES, initialSampleTrades);
      return initialSampleTrades;
    }
    return stored;
  }

  static saveTradeRecords(trades: TradeRecord[]): void {
    setItem(STORAGE_KEYS.TRADES, trades);
  }

  static getUserName(): string {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME) || 'Guest';
  }

  static saveUserName(name: string): void {
    localStorage.setItem(STORAGE_KEYS.USER_NAME, name);
  }

  static getThemeMode(): string {
    return localStorage.getItem(STORAGE_KEYS.THEME_MODE) || 'SYSTEM';
  }

  static saveThemeMode(mode: string): void {
    localStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
  }

  static getChartColorPalette(): string {
    return localStorage.getItem(STORAGE_KEYS.CHART_PALETTE) || 'Default';
  }

  static saveChartColorPalette(palette: string): void {
    localStorage.setItem(STORAGE_KEYS.CHART_PALETTE, palette);
  }

  static exportBackup(): string {
    const backup: BackupData = {
      positions: this.getPositions(),
      fixedDeposits: this.getFixedDeposits(),
      unitTrusts: this.getUnitTrusts(),
      crypto: this.getCrypto(),
      otherInvestments: this.getOtherInvestments(),
      dividends: this.getDividends(),
      userName: this.getUserName(),
      chartColorPalette: this.getChartColorPalette()
    };
    return JSON.stringify(backup, null, 2);
  }

  static importBackup(jsonString: string): boolean {
    try {
      const data: BackupData = JSON.parse(jsonString);
      if (data && typeof data === 'object') {
        if (Array.isArray(data.positions)) this.savePositions(data.positions);
        if (Array.isArray(data.fixedDeposits)) this.saveFixedDeposits(data.fixedDeposits);
        if (Array.isArray(data.unitTrusts)) this.saveUnitTrusts(data.unitTrusts);
        if (Array.isArray(data.crypto)) this.saveCrypto(data.crypto);
        if (Array.isArray(data.otherInvestments)) this.saveOtherInvestments(data.otherInvestments);
        if (Array.isArray(data.dividends)) this.saveDividends(data.dividends);
        if (data.userName) this.saveUserName(data.userName);
        if (data.chartColorPalette) this.saveChartColorPalette(data.chartColorPalette);
        return true;
      }
    } catch (e) {
      console.error("Backup import error", e);
    }
    return false;
  }
}

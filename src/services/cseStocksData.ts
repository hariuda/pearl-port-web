/**
 * Colombo Stock Exchange (CSE) Stock Master Database
 * Comprehensive list of listed equities, official symbols, company names, and GICS sectors.
 */

export interface CseStockInfo {
  symbol: string;
  baseSymbol: string;
  name: string;
  sector: string;
  price?: number;
  isNonVoting?: boolean;
}

export const CSE_STOCKS_DATA: Record<string, CseStockInfo> = {
  "AAF.N0000": {
    symbol: "AAF.N0000",
    baseSymbol: "AAF",
    name: "Asia Asset Finance PLC",
    sector: "Diversified Financials",
    price: 42.7,
    isNonVoting: false
  },
  "AAIC.N0000": {
    symbol: "AAIC.N0000",
    baseSymbol: "AAIC",
    name: "Softlogic Life Insurance PLC",
    sector: "Insurance",
    price: 70.2,
    isNonVoting: false
  },
  "ABAN.N0000": {
    symbol: "ABAN.N0000",
    baseSymbol: "ABAN",
    name: "Abans Electricals PLC",
    sector: "Consumer Durables & Apparel",
    price: 1002.75,
    isNonVoting: false
  },
  "ABL.N0000": {
    symbol: "ABL.N0000",
    baseSymbol: "ABL",
    name: "Amana Bank PLC",
    sector: "Banks",
    price: 23.9,
    isNonVoting: false
  },
  "ACAP.N0000": {
    symbol: "ACAP.N0000",
    baseSymbol: "ACAP",
    name: "Asia Capital PLC",
    sector: "Diversified Financials",
    price: 0,
    isNonVoting: false
  },
  "ACL.N0000": {
    symbol: "ACL.N0000",
    baseSymbol: "ACL",
    name: "ACL Cables PLC",
    sector: "Capital Goods",
    price: 86.1,
    isNonVoting: false
  },
  "ACME.N0000": {
    symbol: "ACME.N0000",
    baseSymbol: "ACME",
    name: "ACME Printing & Packaging PLC",
    sector: "Materials",
    price: 3.4,
    isNonVoting: false
  },
  "AEL.N0000": {
    symbol: "AEL.N0000",
    baseSymbol: "AEL",
    name: "Access Engineering PLC",
    sector: "Capital Goods",
    price: 74.8,
    isNonVoting: false
  },
  "AFS.N0000": {
    symbol: "AFS.N0000",
    baseSymbol: "AFS",
    name: "Alpha Fire Services PLC",
    sector: "Capital Goods",
    price: 20.5,
    isNonVoting: false
  },
  "AFSL.N0000": {
    symbol: "AFSL.N0000",
    baseSymbol: "AFSL",
    name: "Abans Finance PLC",
    sector: "Diversified Financials",
    price: 75,
    isNonVoting: false
  },
  "AGAL.N0000": {
    symbol: "AGAL.N0000",
    baseSymbol: "AGAL",
    name: "Agalawatte Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 48.2,
    isNonVoting: false
  },
  "AGPL.N0000": {
    symbol: "AGPL.N0000",
    baseSymbol: "AGPL",
    name: "Agarapatana Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 13.2,
    isNonVoting: false
  },
  "AGST.N0000": {
    symbol: "AGST.N0000",
    baseSymbol: "AGST",
    name: "Agstar PLC",
    sector: "Materials",
    price: 10.5,
    isNonVoting: false
  },
  "AHPL.N0000": {
    symbol: "AHPL.N0000",
    baseSymbol: "AHPL",
    name: "Asian Hotels & Properties PLC",
    sector: "Consumer Services",
    price: 44,
    isNonVoting: false
  },
  "AHUN.N0000": {
    symbol: "AHUN.N0000",
    baseSymbol: "AHUN",
    name: "Aitken Spence Hotel Holdings PLC",
    sector: "Consumer Services",
    price: 77.7,
    isNonVoting: false
  },
  "AINS.N0000": {
    symbol: "AINS.N0000",
    baseSymbol: "AINS",
    name: "Arpico Insurance PLC",
    sector: "Insurance",
    price: 25.5,
    isNonVoting: false
  },
  "ALLI.N0000": {
    symbol: "ALLI.N0000",
    baseSymbol: "ALLI",
    name: "Alliance Finance Company PLC",
    sector: "Diversified Financials",
    price: 296.5,
    isNonVoting: false
  },
  "ALUF.N0000": {
    symbol: "ALUF.N0000",
    baseSymbol: "ALUF",
    name: "Unisyst Engineering PLC",
    sector: "Capital Goods",
    price: 0,
    isNonVoting: false
  },
  "ALUM.N0000": {
    symbol: "ALUM.N0000",
    baseSymbol: "ALUM",
    name: "Alumex PLC",
    sector: "Materials",
    price: 14.6,
    isNonVoting: false
  },
  "AMCL.N0000": {
    symbol: "AMCL.N0000",
    baseSymbol: "AMCL",
    name: "AMW Capital Leasing and Finance PLC",
    sector: "Diversified Financials",
    price: 0,
    isNonVoting: false
  },
  "AMF.N0000": {
    symbol: "AMF.N0000",
    baseSymbol: "AMF",
    name: "Associated Motor Finance Company PLC",
    sector: "Diversified Financials",
    price: 0,
    isNonVoting: false
  },
  "AMSL.N0000": {
    symbol: "AMSL.N0000",
    baseSymbol: "AMSL",
    name: "Asiri Surgical Hospital PLC",
    sector: "Health Care Equipment & Services",
    price: 10,
    isNonVoting: false
  },
  "APLA.N0000": {
    symbol: "APLA.N0000",
    baseSymbol: "APLA",
    name: "ACL Plastics PLC",
    sector: "Materials",
    price: 157.75,
    isNonVoting: false
  },
  "ASCO.N0000": {
    symbol: "ASCO.N0000",
    baseSymbol: "ASCO",
    name: "Lanka Realty Investments PLC",
    sector: "Real Estate Management & Development",
    price: 43.3,
    isNonVoting: false
  },
  "ASHO.N0000": {
    symbol: "ASHO.N0000",
    baseSymbol: "ASHO",
    name: "Lanka Ashok Leyland PLC",
    sector: "Capital Goods",
    price: 2513,
    isNonVoting: false
  },
  "ASIR.N0000": {
    symbol: "ASIR.N0000",
    baseSymbol: "ASIR",
    name: "Asiri Hospital Holdings PLC",
    sector: "Health Care Equipment & Services",
    price: 24.9,
    isNonVoting: false
  },
  "ASIY.N0000": {
    symbol: "ASIY.N0000",
    baseSymbol: "ASIY",
    name: "Asia Siyaka Commodities PLC",
    sector: "Diversified Financials",
    price: 11.6,
    isNonVoting: false
  },
  "ASPH.N0000": {
    symbol: "ASPH.N0000",
    baseSymbol: "ASPH",
    name: "Industrial Asphalts (ceylon) PLC",
    sector: "Materials",
    price: 0.5,
    isNonVoting: false
  },
  "ASPM.N0000": {
    symbol: "ASPM.N0000",
    baseSymbol: "ASPM",
    name: "Aitken Spence Plantation Managements PLC",
    sector: "Food, Beverage & Tobacco",
    price: 0,
    isNonVoting: false
  },
  "ATL.N0000": {
    symbol: "ATL.N0000",
    baseSymbol: "ATL",
    name: "Amana Takaful PLC",
    sector: "Insurance",
    price: 20.2,
    isNonVoting: false
  },
  "ATLL.N0000": {
    symbol: "ATLL.N0000",
    baseSymbol: "ATLL",
    name: "Amana Takaful Life PLC",
    sector: "Insurance",
    price: 18.2,
    isNonVoting: false
  },
  "AUTO.N0000": {
    symbol: "AUTO.N0000",
    baseSymbol: "AUTO",
    name: "The Autodrome PLC",
    sector: "Retailing",
    price: 299.75,
    isNonVoting: false
  },
  "BALA.N0000": {
    symbol: "BALA.N0000",
    baseSymbol: "BALA",
    name: "Balangoda Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 53.7,
    isNonVoting: false
  },
  "BBH.N0000": {
    symbol: "BBH.N0000",
    baseSymbol: "BBH",
    name: "Browns Beach Hotels PLC",
    sector: "Consumer Services",
    price: 0,
    isNonVoting: false
  },
  "BERU.N0000": {
    symbol: "BERU.N0000",
    baseSymbol: "BERU",
    name: "Beruwala Resorts PLC",
    sector: "Consumer Services",
    price: 2.7,
    isNonVoting: false
  },
  "BFL.N0000": {
    symbol: "BFL.N0000",
    baseSymbol: "BFL",
    name: "Bairaha Farms PLC",
    sector: "Food, Beverage & Tobacco",
    price: 80.5,
    isNonVoting: false
  },
  "BFN.N0000": {
    symbol: "BFN.N0000",
    baseSymbol: "BFN",
    name: "Janashakthi Finance PLC",
    sector: "Diversified Financials",
    price: 25,
    isNonVoting: false
  },
  "BIL.N0000": {
    symbol: "BIL.N0000",
    baseSymbol: "BIL",
    name: "Browns Investments PLC",
    sector: "Food, Beverage & Tobacco",
    price: 4.5,
    isNonVoting: false
  },
  "BLUE.N0000": {
    symbol: "BLUE.N0000",
    baseSymbol: "BLUE",
    name: "Blue Diamonds Jewellery Worldwide PLC",
    sector: "Consumer Durables & Apparel",
    price: 0,
    isNonVoting: false
  },
  "BOGA.N0000": {
    symbol: "BOGA.N0000",
    baseSymbol: "BOGA",
    name: "Bogala Graphite Lanka PLC",
    sector: "Materials",
    price: 105.25,
    isNonVoting: false
  },
  "BOPL.N0000": {
    symbol: "BOPL.N0000",
    baseSymbol: "BOPL",
    name: "Bogawantalawa TEA Estates PLC",
    sector: "Food, Beverage & Tobacco",
    price: 67.4,
    isNonVoting: false
  },
  "BPPL.N0000": {
    symbol: "BPPL.N0000",
    baseSymbol: "BPPL",
    name: "B P P L Holdings PLC",
    sector: "Household & Personal Products",
    price: 15.5,
    isNonVoting: false
  },
  "BREW.N0000": {
    symbol: "BREW.N0000",
    baseSymbol: "BREW",
    name: "Ceylon Beverage Holdings PLC",
    sector: "Food, Beverage & Tobacco",
    price: 2500,
    isNonVoting: false
  },
  "BRR.N0000": {
    symbol: "BRR.N0000",
    baseSymbol: "BRR",
    name: "Bansei Royal Resorts Hikkaduwa PLC",
    sector: "Consumer Services",
    price: 18.1,
    isNonVoting: false
  },
  "BRWN.N0000": {
    symbol: "BRWN.N0000",
    baseSymbol: "BRWN",
    name: "Brown & Company PLC",
    sector: "Capital Goods",
    price: 112.75,
    isNonVoting: false
  },
  "BUKI.N0000": {
    symbol: "BUKI.N0000",
    baseSymbol: "BUKI",
    name: "Bukit Darah PLC",
    sector: "Food, Beverage & Tobacco",
    price: 817.5,
    isNonVoting: false
  },
  "CABO.N0000": {
    symbol: "CABO.N0000",
    baseSymbol: "CABO",
    name: "Cargo Boat Development Company PLC",
    sector: "Real Estate Management & Development",
    price: 157,
    isNonVoting: false
  },
  "CALF.N0000": {
    symbol: "CALF.N0000",
    baseSymbol: "CALF",
    name: "Dialog Finance PLC",
    sector: "Diversified Financials",
    price: 113,
    isNonVoting: false
  },
  "CALH.N0000": {
    symbol: "CALH.N0000",
    baseSymbol: "CALH",
    name: "Capital Alliance Holdings PLC",
    sector: "Diversified Financials",
    price: 11.3,
    isNonVoting: false
  },
  "CALI.U0000": {
    symbol: "CALI.U0000",
    baseSymbol: "CALI",
    name: "CAL Five Year Optimum Fund Units",
    sector: "Diversified Financials",
    price: 13,
    isNonVoting: false
  },
  "CALT.N0000": {
    symbol: "CALT.N0000",
    baseSymbol: "CALT",
    name: "Capital Alliance PLC",
    sector: "Diversified Financials",
    price: 40.5,
    isNonVoting: false
  },
  "CARE.N0000": {
    symbol: "CARE.N0000",
    baseSymbol: "CARE",
    name: "Printcare PLC",
    sector: "Commercial & Professional Services",
    price: 33.4,
    isNonVoting: false
  },
  "CARG.N0000": {
    symbol: "CARG.N0000",
    baseSymbol: "CARG",
    name: "Cargills (ceylon) PLC",
    sector: "Food & Staples Retailing",
    price: 650.5,
    isNonVoting: false
  },
  "CARS.N0000": {
    symbol: "CARS.N0000",
    baseSymbol: "CARS",
    name: "Carson Cumberbatch PLC",
    sector: "Food, Beverage & Tobacco",
    price: 663.25,
    isNonVoting: false
  },
  "CBNK.N0000": {
    symbol: "CBNK.N0000",
    baseSymbol: "CBNK",
    name: "Cargills Bank PLC",
    sector: "Banks",
    price: 6.8,
    isNonVoting: false
  },
  "CCS.N0000": {
    symbol: "CCS.N0000",
    baseSymbol: "CCS",
    name: "Ceylon Cold Stores PLC",
    sector: "Food, Beverage & Tobacco",
    price: 120,
    isNonVoting: false
  },
  "CDB.N0000": {
    symbol: "CDB.N0000",
    baseSymbol: "CDB",
    name: "Citizens Development Business Finance PLC",
    sector: "Diversified Financials",
    price: 31.9,
    isNonVoting: false
  },
  "CDB.X0000": {
    symbol: "CDB.X0000",
    baseSymbol: "CDB",
    name: "Citizens Development Business Finance PLC",
    sector: "Diversified Financials",
    price: 28.1,
    isNonVoting: true
  },
  "CERA.N0000": {
    symbol: "CERA.N0000",
    baseSymbol: "CERA",
    name: "Lanka Ceramic PLC",
    sector: "Capital Goods",
    price: 171.75,
    isNonVoting: false
  },
  "CFI.N0000": {
    symbol: "CFI.N0000",
    baseSymbol: "CFI",
    name: "Colombo Fort Investments PLC",
    sector: "Diversified Financials",
    price: 296,
    isNonVoting: false
  },
  "CFIN.N0000": {
    symbol: "CFIN.N0000",
    baseSymbol: "CFIN",
    name: "Central Finance Company PLC",
    sector: "Diversified Financials",
    price: 194,
    isNonVoting: false
  },
  "CFLB.N0000": {
    symbol: "CFLB.N0000",
    baseSymbol: "CFLB",
    name: "The Colombo Fort Land & Building PLC",
    sector: "Capital Goods",
    price: 49.7,
    isNonVoting: false
  },
  "CFVF.N0000": {
    symbol: "CFVF.N0000",
    baseSymbol: "CFVF",
    name: "First Capital Holdings PLC",
    sector: "Diversified Financials",
    price: 36.4,
    isNonVoting: false
  },
  "CHL.N0000": {
    symbol: "CHL.N0000",
    baseSymbol: "CHL",
    name: "Ceylon Hospitals PLC (durdans)",
    sector: "Health Care Equipment & Services",
    price: 54.6,
    isNonVoting: false
  },
  "CHMX.N0000": {
    symbol: "CHMX.N0000",
    baseSymbol: "CHMX",
    name: "Chemanex PLC",
    sector: "Materials",
    price: 150.25,
    isNonVoting: false
  },
  "CHOT.N0000": {
    symbol: "CHOT.N0000",
    baseSymbol: "CHOT",
    name: "Ceylon Hotels Corporation PLC",
    sector: "Consumer Services",
    price: 27,
    isNonVoting: false
  },
  "CIC.N0000": {
    symbol: "CIC.N0000",
    baseSymbol: "CIC",
    name: "CIC Holdings PLC",
    sector: "Materials",
    price: 25.1,
    isNonVoting: false
  },
  "CIC.X0000": {
    symbol: "CIC.X0000",
    baseSymbol: "CIC",
    name: "CIC Holdings PLC",
    sector: "Materials",
    price: 21.5,
    isNonVoting: true
  },
  "CIND.N0000": {
    symbol: "CIND.N0000",
    baseSymbol: "CIND",
    name: "Central Industries PLC",
    sector: "Capital Goods",
    price: 195,
    isNonVoting: false
  },
  "CINS.N0000": {
    symbol: "CINS.N0000",
    baseSymbol: "CINS",
    name: "Ceylinco Holdings PLC",
    sector: "Insurance",
    price: 2899.5,
    isNonVoting: false
  },
  "CINS.X0000": {
    symbol: "CINS.X0000",
    baseSymbol: "CINS",
    name: "Ceylinco Holdings PLC",
    sector: "Insurance",
    price: 1458.5,
    isNonVoting: true
  },
  "CINV.N0000": {
    symbol: "CINV.N0000",
    baseSymbol: "CINV",
    name: "Ceylon Investment PLC",
    sector: "Diversified Financials",
    price: 98.5,
    isNonVoting: false
  },
  "CIT.N0000": {
    symbol: "CIT.N0000",
    baseSymbol: "CIT",
    name: "Colombo Investment Trust PLC",
    sector: "Diversified Financials",
    price: 349,
    isNonVoting: false
  },
  "CITH.N0000": {
    symbol: "CITH.N0000",
    baseSymbol: "CITH",
    name: "Hikkaduwa Beach Resort PLC",
    sector: "Consumer Services",
    price: 4.4,
    isNonVoting: false
  },
  "CITW.N0000": {
    symbol: "CITW.N0000",
    baseSymbol: "CITW",
    name: "Waskaduwa Beach Resort PLC",
    sector: "Consumer Services",
    price: 1.5,
    isNonVoting: false
  },
  "CLND.N0000": {
    symbol: "CLND.N0000",
    baseSymbol: "CLND",
    name: "Colombo Land & Development Company PLC",
    sector: "Real Estate Management & Development",
    price: 44.1,
    isNonVoting: false
  },
  "COCO.N0000": {
    symbol: "COCO.N0000",
    baseSymbol: "COCO",
    name: "Renuka Foods PLC",
    sector: "Food, Beverage & Tobacco",
    price: 19.6,
    isNonVoting: false
  },
  "COCO.X0000": {
    symbol: "COCO.X0000",
    baseSymbol: "COCO",
    name: "Renuka Foods PLC",
    sector: "Food, Beverage & Tobacco",
    price: 19.7,
    isNonVoting: true
  },
  "COCR.N0000": {
    symbol: "COCR.N0000",
    baseSymbol: "COCR",
    name: "Commercial Credit and Finance PLC",
    sector: "Diversified Financials",
    price: 90.3,
    isNonVoting: false
  },
  "COLO.N0000": {
    symbol: "COLO.N0000",
    baseSymbol: "COLO",
    name: "C M Holdings PLC",
    sector: "Retailing",
    price: 30.3,
    isNonVoting: false
  },
  "COMB.N0000": {
    symbol: "COMB.N0000",
    baseSymbol: "COMB",
    name: "Commercial Bank of Ceylon PLC",
    sector: "Banks",
    price: 196.25,
    isNonVoting: false
  },
  "COMB.X0000": {
    symbol: "COMB.X0000",
    baseSymbol: "COMB",
    name: "Commercial Bank of Ceylon PLC (Non-Voting)",
    sector: "Banks",
    price: 179,
    isNonVoting: true
  },
  "COMD.N0000": {
    symbol: "COMD.N0000",
    baseSymbol: "COMD",
    name: "Commercial Development Company PLC",
    sector: "Real Estate Management & Development",
    price: 278,
    isNonVoting: false
  },
  "CONN.N0000": {
    symbol: "CONN.N0000",
    baseSymbol: "CONN",
    name: "Hayleys Leisure PLC",
    sector: "Consumer Services",
    price: 22.1,
    isNonVoting: false
  },
  "COOP.N0000": {
    symbol: "COOP.N0000",
    baseSymbol: "COOP",
    name: "Co-operative Insurance Company PLC",
    sector: "Insurance",
    price: 2.9,
    isNonVoting: false
  },
  "CPRT.N0000": {
    symbol: "CPRT.N0000",
    baseSymbol: "CPRT",
    name: "Kerner Haus Global Solutions PLC",
    sector: "Real Estate Management & Development",
    price: 31,
    isNonVoting: false
  },
  "CRL.N0000": {
    symbol: "CRL.N0000",
    baseSymbol: "CRL",
    name: "Softlogic Finance PLC",
    sector: "Diversified Financials",
    price: 3.1,
    isNonVoting: false
  },
  "CSD.N0000": {
    symbol: "CSD.N0000",
    baseSymbol: "CSD",
    name: "Seylan Developments PLC",
    sector: "Real Estate Management & Development",
    price: 22.1,
    isNonVoting: false
  },
  "CSF.N0000": {
    symbol: "CSF.N0000",
    baseSymbol: "CSF",
    name: "Nation Lanka Finance PLC",
    sector: "Diversified Financials",
    price: 0,
    isNonVoting: false
  },
  "CSLK.N0000": {
    symbol: "CSLK.N0000",
    baseSymbol: "CSLK",
    name: "Cable Solutions PLC",
    sector: "Capital Goods",
    price: 11.9,
    isNonVoting: false
  },
  "CTBL.N0000": {
    symbol: "CTBL.N0000",
    baseSymbol: "CTBL",
    name: "Ceylon TEA Brokers PLC",
    sector: "Retailing",
    price: 9.1,
    isNonVoting: false
  },
  "CTC.N0000": {
    symbol: "CTC.N0000",
    baseSymbol: "CTC",
    name: "Ceylon Tobacco Company PLC",
    sector: "Food, Beverage & Tobacco",
    price: 1795.5,
    isNonVoting: false
  },
  "CTEA.N0000": {
    symbol: "CTEA.N0000",
    baseSymbol: "CTEA",
    name: "Dilmah Ceylon TEA Company PLC",
    sector: "Food, Beverage & Tobacco",
    price: 1275.5,
    isNonVoting: false
  },
  "CTHR.N0000": {
    symbol: "CTHR.N0000",
    baseSymbol: "CTHR",
    name: "C T Holdings PLC",
    sector: "Food & Staples Retailing",
    price: 536,
    isNonVoting: false
  },
  "CTLD.N0000": {
    symbol: "CTLD.N0000",
    baseSymbol: "CTLD",
    name: "C T Land Development PLC",
    sector: "Real Estate Management & Development",
    price: 36.3,
    isNonVoting: false
  },
  "CWL.N0000": {
    symbol: "CWL.N0000",
    baseSymbol: "CWL",
    name: "Chrissworld PLC",
    sector: "Capital Goods",
    price: 14.5,
    isNonVoting: false
  },
  "CWM.N0000": {
    symbol: "CWM.N0000",
    baseSymbol: "CWM",
    name: "C. W. Mackie PLC",
    sector: "Retailing",
    price: 33,
    isNonVoting: false
  },
  "DFCC.N0000": {
    symbol: "DFCC.N0000",
    baseSymbol: "DFCC",
    name: "DFCC Bank PLC",
    sector: "Banks",
    price: 116.25,
    isNonVoting: false
  },
  "DIAL.N0000": {
    symbol: "DIAL.N0000",
    baseSymbol: "DIAL",
    name: "Dialog Axiata PLC",
    sector: "Telecommunication Services",
    price: 42.4,
    isNonVoting: false
  },
  "DIMO.N0000": {
    symbol: "DIMO.N0000",
    baseSymbol: "DIMO",
    name: "Diesel & Motor Engineering PLC",
    sector: "Retailing",
    price: 1335,
    isNonVoting: false
  },
  "DIPD.N0000": {
    symbol: "DIPD.N0000",
    baseSymbol: "DIPD",
    name: "Dipped Products PLC",
    sector: "Materials",
    price: 56.5,
    isNonVoting: false
  },
  "DIST.N0000": {
    symbol: "DIST.N0000",
    baseSymbol: "DIST",
    name: "Distilleries Company of Sri Lanka PLC",
    sector: "Food, Beverage & Tobacco",
    price: 50.9,
    isNonVoting: false
  },
  "DOCK.N0000": {
    symbol: "DOCK.N0000",
    baseSymbol: "DOCK",
    name: "Colombo Dockyard PLC",
    sector: "Capital Goods",
    price: 103.75,
    isNonVoting: false
  },
  "DPL.N0000": {
    symbol: "DPL.N0000",
    baseSymbol: "DPL",
    name: "Dankotuwa Porcelain PLC",
    sector: "Consumer Durables & Apparel",
    price: 10.9,
    isNonVoting: false
  },
  "EAST.N0000": {
    symbol: "EAST.N0000",
    baseSymbol: "EAST",
    name: "EAST West Properties PLC",
    sector: "Real Estate Management & Development",
    price: 65.4,
    isNonVoting: false
  },
  "EBCR.N0000": {
    symbol: "EBCR.N0000",
    baseSymbol: "EBCR",
    name: "E B Creasy & Company PLC",
    sector: "Capital Goods",
    price: 33.6,
    isNonVoting: false
  },
  "ECL.N0000": {
    symbol: "ECL.N0000",
    baseSymbol: "ECL",
    name: "E-channelling PLC",
    sector: "Health Care Equipment & Services",
    price: 15,
    isNonVoting: false
  },
  "EDEN.N0000": {
    symbol: "EDEN.N0000",
    baseSymbol: "EDEN",
    name: "Eden Hotel Lanka PLC",
    sector: "Consumer Services",
    price: 8.6,
    isNonVoting: false
  },
  "ELPL.N0000": {
    symbol: "ELPL.N0000",
    baseSymbol: "ELPL",
    name: "Elpitiya Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 167.75,
    isNonVoting: false
  },
  "EMER.N0000": {
    symbol: "EMER.N0000",
    baseSymbol: "EMER",
    name: "Eastern Merchants PLC",
    sector: "Retailing",
    price: 8.5,
    isNonVoting: false
  },
  "EML.N0000": {
    symbol: "EML.N0000",
    baseSymbol: "EML",
    name: "E M L Consultants PLC",
    sector: "Commercial & Professional Services",
    price: 6.9,
    isNonVoting: false
  },
  "ETWO.N0000": {
    symbol: "ETWO.N0000",
    baseSymbol: "ETWO",
    name: "Equity Two PLC",
    sector: "Real Estate Management & Development",
    price: 52.7,
    isNonVoting: false
  },
  "EXPO.N0000": {
    symbol: "EXPO.N0000",
    baseSymbol: "EXPO",
    name: "Expolanka Holdings PLC",
    sector: "Transportation",
    price: 0,
    isNonVoting: false
  },
  "EXT.N0000": {
    symbol: "EXT.N0000",
    baseSymbol: "EXT",
    name: "Exterminators PLC",
    sector: "Commercial & Professional Services",
    price: 11.7,
    isNonVoting: false
  },
  "FCT.N0000": {
    symbol: "FCT.N0000",
    baseSymbol: "FCT",
    name: "First Capital Treasuries PLC",
    sector: "Diversified Financials",
    price: 23.2,
    isNonVoting: false
  },
  "GEST.N0000": {
    symbol: "GEST.N0000",
    baseSymbol: "GEST",
    name: "Gestetner of Ceylon PLC",
    sector: "Commercial & Professional Services",
    price: 300,
    isNonVoting: false
  },
  "GHLL.N0000": {
    symbol: "GHLL.N0000",
    baseSymbol: "GHLL",
    name: "Galadari Hotels (lanka) PLC",
    sector: "Consumer Services",
    price: 14.1,
    isNonVoting: false
  },
  "GLAS.N0000": {
    symbol: "GLAS.N0000",
    baseSymbol: "GLAS",
    name: "PGP Glass Ceylon PLC",
    sector: "Materials",
    price: 55.5,
    isNonVoting: false
  },
  "GRAN.N0000": {
    symbol: "GRAN.N0000",
    baseSymbol: "GRAN",
    name: "Ceylon Grain Elevators PLC",
    sector: "Food, Beverage & Tobacco",
    price: 449.5,
    isNonVoting: false
  },
  "GREG.N0000": {
    symbol: "GREG.N0000",
    baseSymbol: "GREG",
    name: "Ambeon Holdings PLC",
    sector: "Consumer Durables & Apparel",
    price: 34,
    isNonVoting: false
  },
  "GUAR.N0000": {
    symbol: "GUAR.N0000",
    baseSymbol: "GUAR",
    name: "Ceylon Guardian Investment Trust PLC",
    sector: "Diversified Financials",
    price: 219.5,
    isNonVoting: false
  },
  "HAPU.N0000": {
    symbol: "HAPU.N0000",
    baseSymbol: "HAPU",
    name: "Hapugastenne Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 50.3,
    isNonVoting: false
  },
  "HARI.N0000": {
    symbol: "HARI.N0000",
    baseSymbol: "HARI",
    name: "Harischandra Mills PLC",
    sector: "Food, Beverage & Tobacco",
    price: 4650.25,
    isNonVoting: false
  },
  "HASU.N0000": {
    symbol: "HASU.N0000",
    baseSymbol: "HASU",
    name: "HNB Life PLC",
    sector: "Insurance",
    price: 134.25,
    isNonVoting: false
  },
  "HAYC.N0000": {
    symbol: "HAYC.N0000",
    baseSymbol: "HAYC",
    name: "Haycarb PLC",
    sector: "Materials",
    price: 197.5,
    isNonVoting: false
  },
  "HAYL.N0000": {
    symbol: "HAYL.N0000",
    baseSymbol: "HAYL",
    name: "Hayleys PLC",
    sector: "Capital Goods",
    price: 218.5,
    isNonVoting: false
  },
  "HBS.N0000": {
    symbol: "HBS.N0000",
    baseSymbol: "HBS",
    name: "Hsenid Business Solutions PLC",
    sector: "Software & Services",
    price: 19,
    isNonVoting: false
  },
  "HDFC.N0000": {
    symbol: "HDFC.N0000",
    baseSymbol: "HDFC",
    name: "Housing Development Finance Corporation Bank of Sri Lanka",
    sector: "Banks",
    price: 58.1,
    isNonVoting: false
  },
  "HELA.N0000": {
    symbol: "HELA.N0000",
    baseSymbol: "HELA",
    name: "Hela Apparel Holdings PLC",
    sector: "Consumer Durables & Apparel",
    price: 0,
    isNonVoting: false
  },
  "HEXP.N0000": {
    symbol: "HEXP.N0000",
    baseSymbol: "HEXP",
    name: "Hayleys Fibre PLC",
    sector: "Consumer Durables & Apparel",
    price: 134.75,
    isNonVoting: false
  },
  "HHL.N0000": {
    symbol: "HHL.N0000",
    baseSymbol: "HHL",
    name: "Hemas Holdings PLC",
    sector: "Health Care Equipment & Services",
    price: 30.2,
    isNonVoting: false
  },
  "HNB.N0000": {
    symbol: "HNB.N0000",
    baseSymbol: "HNB",
    name: "Hatton National Bank PLC",
    sector: "Banks",
    price: 369.75,
    isNonVoting: false
  },
  "HNB.X0000": {
    symbol: "HNB.X0000",
    baseSymbol: "HNB",
    name: "Hatton National Bank PLC (Non-Voting)",
    sector: "Banks",
    price: 303.5,
    isNonVoting: true
  },
  "HNBF.N0000": {
    symbol: "HNBF.N0000",
    baseSymbol: "HNBF",
    name: "HNB Finance PLC",
    sector: "Banks",
    price: 6.3,
    isNonVoting: false
  },
  "HNBF.X0000": {
    symbol: "HNBF.X0000",
    baseSymbol: "HNBF",
    name: "HNB Finance PLC",
    sector: "Banks",
    price: 6,
    isNonVoting: true
  },
  "HOPL.N0000": {
    symbol: "HOPL.N0000",
    baseSymbol: "HOPL",
    name: "Horana Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 51.8,
    isNonVoting: false
  },
  "HPFL.N0000": {
    symbol: "HPFL.N0000",
    baseSymbol: "HPFL",
    name: "Lotus Hydro Power PLC",
    sector: "Utilities",
    price: 10.1,
    isNonVoting: false
  },
  "HPL.N0000": {
    symbol: "HPL.N0000",
    baseSymbol: "HPL",
    name: "Hatton Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 23.6,
    isNonVoting: false
  },
  "HPWR.N0000": {
    symbol: "HPWR.N0000",
    baseSymbol: "HPWR",
    name: "Resus Energy PLC",
    sector: "Utilities",
    price: 8.3,
    isNonVoting: false
  },
  "HSIG.N0000": {
    symbol: "HSIG.N0000",
    baseSymbol: "HSIG",
    name: "Hotel Sigiriya PLC",
    sector: "Consumer Services",
    price: 65.4,
    isNonVoting: false
  },
  "HUNA.N0000": {
    symbol: "HUNA.N0000",
    baseSymbol: "HUNA",
    name: "Hunas Holdings PLC",
    sector: "Consumer Services",
    price: 13.7,
    isNonVoting: false
  },
  "HUNT.N0000": {
    symbol: "HUNT.N0000",
    baseSymbol: "HUNT",
    name: "Hunters & Company PLC",
    sector: "Retailing",
    price: 0,
    isNonVoting: false
  },
  "HVA.N0000": {
    symbol: "HVA.N0000",
    baseSymbol: "HVA",
    name: "Hva Foods PLC",
    sector: "Food, Beverage & Tobacco",
    price: 3.8,
    isNonVoting: false
  },
  "IDL.N0000": {
    symbol: "IDL.N0000",
    baseSymbol: "IDL",
    name: "Serendib Engineering Group PLC",
    sector: "Capital Goods",
    price: 0,
    isNonVoting: false
  },
  "JAT.N0000": {
    symbol: "JAT.N0000",
    baseSymbol: "JAT",
    name: "JAT Holdings PLC",
    sector: "Materials",
    price: 29,
    isNonVoting: false
  },
  "JETS.N0000": {
    symbol: "JETS.N0000",
    baseSymbol: "JETS",
    name: "Jetwing Symphony PLC",
    sector: "Consumer Services",
    price: 13.1,
    isNonVoting: false
  },
  "JFP.N0000": {
    symbol: "JFP.N0000",
    baseSymbol: "JFP",
    name: "Jf Packaging PLC",
    sector: "Materials",
    price: 14.6,
    isNonVoting: false
  },
  "JINS.N0000": {
    symbol: "JINS.N0000",
    baseSymbol: "JINS",
    name: "Janashakthi Insurance PLC",
    sector: "Insurance",
    price: 32.2,
    isNonVoting: false
  },
  "JKH.N0000": {
    symbol: "JKH.N0000",
    baseSymbol: "JKH",
    name: "John Keells Holdings PLC",
    sector: "Capital Goods",
    price: 17.6,
    isNonVoting: false
  },
  "JKL.N0000": {
    symbol: "JKL.N0000",
    baseSymbol: "JKL",
    name: "John Keells PLC",
    sector: "Retailing",
    price: 71.9,
    isNonVoting: false
  },
  "JXG.N0000": {
    symbol: "JXG.N0000",
    baseSymbol: "JXG",
    name: "Janashakthi PLC",
    sector: "Diversified Financials",
    price: 9.1,
    isNonVoting: false
  },
  "KAHA.N0000": {
    symbol: "KAHA.N0000",
    baseSymbol: "KAHA",
    name: "Kahawatte Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 14.2,
    isNonVoting: false
  },
  "KCAB.N0000": {
    symbol: "KCAB.N0000",
    baseSymbol: "KCAB",
    name: "Kelani Cables PLC",
    sector: "Capital Goods",
    price: 93.8,
    isNonVoting: false
  },
  "KDL.N0000": {
    symbol: "KDL.N0000",
    baseSymbol: "KDL",
    name: "Kelsey Developments PLC",
    sector: "Consumer Durables & Apparel",
    price: 0,
    isNonVoting: false
  },
  "KFP.N0000": {
    symbol: "KFP.N0000",
    baseSymbol: "KFP",
    name: "Keells Food Products PLC",
    sector: "Food, Beverage & Tobacco",
    price: 169.5,
    isNonVoting: false
  },
  "KGAL.N0000": {
    symbol: "KGAL.N0000",
    baseSymbol: "KGAL",
    name: "Kegalle Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 143.75,
    isNonVoting: false
  },
  "KHC.N0000": {
    symbol: "KHC.N0000",
    baseSymbol: "KHC",
    name: "The Kandy Hotels Company (1938) PLC",
    sector: "Consumer Services",
    price: 11.1,
    isNonVoting: false
  },
  "KHL.N0000": {
    symbol: "KHL.N0000",
    baseSymbol: "KHL",
    name: "John Keells Hotels PLC",
    sector: "Consumer Services",
    price: 15,
    isNonVoting: false
  },
  "KOTA.N0000": {
    symbol: "KOTA.N0000",
    baseSymbol: "KOTA",
    name: "Kotagala Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 6.9,
    isNonVoting: false
  },
  "KPHL.N0000": {
    symbol: "KPHL.N0000",
    baseSymbol: "KPHL",
    name: "Kapruka Holdings PLC",
    sector: "Retailing",
    price: 14.2,
    isNonVoting: false
  },
  "KVAL.N0000": {
    symbol: "KVAL.N0000",
    baseSymbol: "KVAL",
    name: "Kelani Valley Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 74.1,
    isNonVoting: false
  },
  "KZOO.N0000": {
    symbol: "KZOO.N0000",
    baseSymbol: "KZOO",
    name: "Ceylon Land & Equity PLC",
    sector: "Real Estate Management & Development",
    price: 6.6,
    isNonVoting: false
  },
  "LALU.N0000": {
    symbol: "LALU.N0000",
    baseSymbol: "LALU",
    name: "Lanka Aluminium Industries PLC",
    sector: "Materials",
    price: 31,
    isNonVoting: false
  },
  "LAMB.N0000": {
    symbol: "LAMB.N0000",
    baseSymbol: "LAMB",
    name: "Kotmale Holdings PLC",
    sector: "Food, Beverage & Tobacco",
    price: 1146,
    isNonVoting: false
  },
  "LCBF.N0000": {
    symbol: "LCBF.N0000",
    baseSymbol: "LCBF",
    name: "Lanka Credit and Business Finance PLC",
    sector: "Diversified Financials",
    price: 5,
    isNonVoting: false
  },
  "LCEY.N0000": {
    symbol: "LCEY.N0000",
    baseSymbol: "LCEY",
    name: "Lankem Ceylon PLC",
    sector: "Capital Goods",
    price: 29,
    isNonVoting: false
  },
  "LDEV.N0000": {
    symbol: "LDEV.N0000",
    baseSymbol: "LDEV",
    name: "Lankem Developments PLC",
    sector: "Food, Beverage & Tobacco",
    price: 17.1,
    isNonVoting: false
  },
  "LFIN.N0000": {
    symbol: "LFIN.N0000",
    baseSymbol: "LFIN",
    name: "L B Finance PLC",
    sector: "Diversified Financials",
    price: 140.25,
    isNonVoting: false
  },
  "LGIL.N0000": {
    symbol: "LGIL.N0000",
    baseSymbol: "LGIL",
    name: "LOLC General Insurance PLC",
    sector: "Insurance",
    price: 5.9,
    isNonVoting: false
  },
  "LGL.N0000": {
    symbol: "LGL.N0000",
    baseSymbol: "LGL",
    name: "Laugfs Gas PLC",
    sector: "Energy",
    price: 35.7,
    isNonVoting: false
  },
  "LGL.X0000": {
    symbol: "LGL.X0000",
    baseSymbol: "LGL",
    name: "Laugfs Gas PLC",
    sector: "Energy",
    price: 28.6,
    isNonVoting: true
  },
  "LHCL.N0000": {
    symbol: "LHCL.N0000",
    baseSymbol: "LHCL",
    name: "The Lanka Hospitals Corporation PLC",
    sector: "Health Care Equipment & Services",
    price: 107.5,
    isNonVoting: false
  },
  "LHL.N0000": {
    symbol: "LHL.N0000",
    baseSymbol: "LHL",
    name: "The Lighthouse Hotel PLC",
    sector: "Consumer Services",
    price: 64.1,
    isNonVoting: false
  },
  "LIOC.N0000": {
    symbol: "LIOC.N0000",
    baseSymbol: "LIOC",
    name: "Lanka Ioc PLC",
    sector: "Energy",
    price: 123.75,
    isNonVoting: false
  },
  "LION.N0000": {
    symbol: "LION.N0000",
    baseSymbol: "LION",
    name: "LION Brewery Ceylon PLC",
    sector: "Food, Beverage & Tobacco",
    price: 1816,
    isNonVoting: false
  },
  "LITE.N0000": {
    symbol: "LITE.N0000",
    baseSymbol: "LITE",
    name: "Laxapana PLC",
    sector: "Capital Goods",
    price: 40.7,
    isNonVoting: false
  },
  "LLUB.N0000": {
    symbol: "LLUB.N0000",
    baseSymbol: "LLUB",
    name: "Chevron Lubricants Lanka PLC",
    sector: "Materials",
    price: 201.75,
    isNonVoting: false
  },
  "LMF.N0000": {
    symbol: "LMF.N0000",
    baseSymbol: "LMF",
    name: "Lanka Milk Foods (cwe) PLC",
    sector: "Food, Beverage & Tobacco",
    price: 82,
    isNonVoting: false
  },
  "LOFC.N0000": {
    symbol: "LOFC.N0000",
    baseSymbol: "LOFC",
    name: "LOLC Finance PLC",
    sector: "Diversified Financials",
    price: 4.5,
    isNonVoting: false
  },
  "LOLC.N0000": {
    symbol: "LOLC.N0000",
    baseSymbol: "LOLC",
    name: "LOLC Holdings PLC",
    sector: "Diversified Financials",
    price: 393.25,
    isNonVoting: false
  },
  "LPL.N0000": {
    symbol: "LPL.N0000",
    baseSymbol: "LPL",
    name: "Laugfs Power PLC",
    sector: "Utilities",
    price: 10,
    isNonVoting: false
  },
  "LPL.X0000": {
    symbol: "LPL.X0000",
    baseSymbol: "LPL",
    name: "Laugfs Power PLC",
    sector: "Utilities",
    price: 8.7,
    isNonVoting: true
  },
  "LPRT.N0000": {
    symbol: "LPRT.N0000",
    baseSymbol: "LPRT",
    name: "Lake House Printers and Publishers PLC",
    sector: "Commercial & Professional Services",
    price: 540,
    isNonVoting: false
  },
  "LUMX.N0000": {
    symbol: "LUMX.N0000",
    baseSymbol: "LUMX",
    name: "Luminex PLC",
    sector: "Capital Goods",
    price: 7.2,
    isNonVoting: false
  },
  "LVEF.N0000": {
    symbol: "LVEF.N0000",
    baseSymbol: "LVEF",
    name: "LVL Energy Fund PLC",
    sector: "Utilities",
    price: 5,
    isNonVoting: false
  },
  "LVEN.N0000": {
    symbol: "LVEN.N0000",
    baseSymbol: "LVEN",
    name: "Lanka Ventures PLC",
    sector: "Diversified Financials",
    price: 46.4,
    isNonVoting: false
  },
  "LWL.N0000": {
    symbol: "LWL.N0000",
    baseSymbol: "LWL",
    name: "Lanka Walltiles PLC",
    sector: "Capital Goods",
    price: 39.5,
    isNonVoting: false
  },
  "MADU.N0000": {
    symbol: "MADU.N0000",
    baseSymbol: "MADU",
    name: "Madulsima Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 8.6,
    isNonVoting: false
  },
  "MAL.N0000": {
    symbol: "MAL.N0000",
    baseSymbol: "MAL",
    name: "Malwatte Valley Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 56.7,
    isNonVoting: false
  },
  "MARA.N0000": {
    symbol: "MARA.N0000",
    baseSymbol: "MARA",
    name: "Marawila Resorts PLC",
    sector: "Consumer Services",
    price: 4.8,
    isNonVoting: false
  },
  "MASK.N0000": {
    symbol: "MASK.N0000",
    baseSymbol: "MASK",
    name: "Maskeliya Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 61.7,
    isNonVoting: false
  },
  "MBSL.N0000": {
    symbol: "MBSL.N0000",
    baseSymbol: "MBSL",
    name: "Merchant Bank of Sri Lanka & Finance PLC",
    sector: "Diversified Financials",
    price: 8.5,
    isNonVoting: false
  },
  "MCPL.N0000": {
    symbol: "MCPL.N0000",
    baseSymbol: "MCPL",
    name: "Mahaweli Coconut Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 43.2,
    isNonVoting: false
  },
  "MDL.N0000": {
    symbol: "MDL.N0000",
    baseSymbol: "MDL",
    name: "Myland Developments PLC",
    sector: "Real Estate Management & Development",
    price: 15.4,
    isNonVoting: false
  },
  "MEL.N0000": {
    symbol: "MEL.N0000",
    baseSymbol: "MEL",
    name: "Greentech Energy PLC",
    sector: "Capital Goods",
    price: 4.2,
    isNonVoting: false
  },
  "MELS.N0000": {
    symbol: "MELS.N0000",
    baseSymbol: "MELS",
    name: "Melstacorp PLC",
    sector: "Food, Beverage & Tobacco",
    price: 177.25,
    isNonVoting: false
  },
  "MERC.N0000": {
    symbol: "MERC.N0000",
    baseSymbol: "MERC",
    name: "Mercantile Investments and Finance PLC",
    sector: "Diversified Financials",
    price: 18.8,
    isNonVoting: false
  },
  "MFL.N0000": {
    symbol: "MFL.N0000",
    baseSymbol: "MFL",
    name: "Multi Finance PLC",
    sector: "Diversified Financials",
    price: 0,
    isNonVoting: false
  },
  "MFPE.N0000": {
    symbol: "MFPE.N0000",
    baseSymbol: "MFPE",
    name: "Maharaja Foods PLC",
    sector: "Food, Beverage & Tobacco",
    price: 14.6,
    isNonVoting: false
  },
  "MGT.N0000": {
    symbol: "MGT.N0000",
    baseSymbol: "MGT",
    name: "Hayleys Fabric PLC",
    sector: "Consumer Durables & Apparel",
    price: 27.3,
    isNonVoting: false
  },
  "MHDL.N0000": {
    symbol: "MHDL.N0000",
    baseSymbol: "MHDL",
    name: "Millennium Housing Developers PLC",
    sector: "Real Estate Management & Development",
    price: 6.4,
    isNonVoting: false
  },
  "MRH.N0000": {
    symbol: "MRH.N0000",
    baseSymbol: "MRH",
    name: "Mahaweli Reach Hotels PLC",
    sector: "Consumer Services",
    price: 15.7,
    isNonVoting: false
  },
  "MSL.N0000": {
    symbol: "MSL.N0000",
    baseSymbol: "MSL",
    name: "Mercantile Shipping Company PLC",
    sector: "Commercial & Professional Services",
    price: 175.5,
    isNonVoting: false
  },
  "MULL.N0000": {
    symbol: "MULL.N0000",
    baseSymbol: "MULL",
    name: "Muller and Phipps (ceylon) PLC",
    sector: "Health Care Equipment & Services",
    price: 2.5,
    isNonVoting: false
  },
  "NAMU.N0000": {
    symbol: "NAMU.N0000",
    baseSymbol: "NAMU",
    name: "Namunukula Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 60.1,
    isNonVoting: false
  },
  "NDB.N0000": {
    symbol: "NDB.N0000",
    baseSymbol: "NDB",
    name: "National Development Bank PLC",
    sector: "Banks",
    price: 103,
    isNonVoting: false
  },
  "NEH.N0000": {
    symbol: "NEH.N0000",
    baseSymbol: "NEH",
    name: "The Nuwara Eliya Hotels Company PLC",
    sector: "Consumer Services",
    price: 4360,
    isNonVoting: false
  },
  "NHL.N0000": {
    symbol: "NHL.N0000",
    baseSymbol: "NHL",
    name: "Nawaloka Hospitals PLC",
    sector: "Health Care Equipment & Services",
    price: 9.9,
    isNonVoting: false
  },
  "NTB.N0000": {
    symbol: "NTB.N0000",
    baseSymbol: "NTB",
    name: "Nations Trust Bank PLC",
    sector: "Banks",
    price: 294.25,
    isNonVoting: false
  },
  "ODEL.N0000": {
    symbol: "ODEL.N0000",
    baseSymbol: "ODEL",
    name: "ODEL PLC",
    sector: "Retailing",
    price: 10.4,
    isNonVoting: false
  },
  "OFEQ.N0000": {
    symbol: "OFEQ.N0000",
    baseSymbol: "OFEQ",
    name: "Office Equipment PLC",
    sector: "Capital Goods",
    price: 305.75,
    isNonVoting: false
  },
  "ONAL.N0000": {
    symbol: "ONAL.N0000",
    baseSymbol: "ONAL",
    name: "On Ally Holdings PLC",
    sector: "Real Estate Management & Development",
    price: 42,
    isNonVoting: false
  },
  "OSEA.N0000": {
    symbol: "OSEA.N0000",
    baseSymbol: "OSEA",
    name: "Overseas Realty (ceylon) PLC",
    sector: "Real Estate Management & Development",
    price: 48,
    isNonVoting: false
  },
  "PABC.N0000": {
    symbol: "PABC.N0000",
    baseSymbol: "PABC",
    name: "Pan Asia Banking Corporation PLC",
    sector: "Banks",
    price: 45.1,
    isNonVoting: false
  },
  "PACK.N0000": {
    symbol: "PACK.N0000",
    baseSymbol: "PACK",
    name: "Ex-pack Corrugated Cartons PLC",
    sector: "Materials",
    price: 9.8,
    isNonVoting: false
  },
  "PALM.N0000": {
    symbol: "PALM.N0000",
    baseSymbol: "PALM",
    name: "PALM Garden Hotels PLC",
    sector: "Consumer Services",
    price: 44.2,
    isNonVoting: false
  },
  "PAP.N0000": {
    symbol: "PAP.N0000",
    baseSymbol: "PAP",
    name: "Panasian Power PLC",
    sector: "Utilities",
    price: 11.7,
    isNonVoting: false
  },
  "PARA.N0000": {
    symbol: "PARA.N0000",
    baseSymbol: "PARA",
    name: "Paragon Ceylon PLC",
    sector: "Commercial & Professional Services",
    price: 416.25,
    isNonVoting: false
  },
  "PARQ.N0000": {
    symbol: "PARQ.N0000",
    baseSymbol: "PARQ",
    name: "Swisstek (ceylon) PLC",
    sector: "Materials",
    price: 80.1,
    isNonVoting: false
  },
  "PEG.N0000": {
    symbol: "PEG.N0000",
    baseSymbol: "PEG",
    name: "Pegasus Hotels of Ceylon PLC",
    sector: "Consumer Services",
    price: 17.8,
    isNonVoting: false
  },
  "PHAR.N0000": {
    symbol: "PHAR.N0000",
    baseSymbol: "PHAR",
    name: "Colombo City Holdings PLC",
    sector: "Real Estate Management & Development",
    price: 175.5,
    isNonVoting: false
  },
  "PINS.N0000": {
    symbol: "PINS.N0000",
    baseSymbol: "PINS",
    name: "People's Insurance PLC",
    sector: "Insurance",
    price: 25.7,
    isNonVoting: false
  },
  "PKME.N0000": {
    symbol: "PKME.N0000",
    baseSymbol: "PKME",
    name: "Digital Mobility Solutions Lanka PLC",
    sector: "Transportation",
    price: 151,
    isNonVoting: false
  },
  "PLC.N0000": {
    symbol: "PLC.N0000",
    baseSymbol: "PLC",
    name: "People's Leasing & Finance PLC",
    sector: "Diversified Financials",
    price: 17,
    isNonVoting: false
  },
  "PLR.N0000": {
    symbol: "PLR.N0000",
    baseSymbol: "PLR",
    name: "Prime Lands Residencies PLC",
    sector: "Real Estate Management & Development",
    price: 32.9,
    isNonVoting: false
  },
  "PMB.N0000": {
    symbol: "PMB.N0000",
    baseSymbol: "PMB",
    name: "Pmf Finance PLC",
    sector: "Diversified Financials",
    price: 8.3,
    isNonVoting: false
  },
  "RAL.N0000": {
    symbol: "RAL.N0000",
    baseSymbol: "RAL",
    name: "Renuka Agri Foods PLC",
    sector: "Food, Beverage & Tobacco",
    price: 9.3,
    isNonVoting: false
  },
  "RCH.N0000": {
    symbol: "RCH.N0000",
    baseSymbol: "RCH",
    name: "Renuka Hotels PLC",
    sector: "Consumer Services",
    price: 175,
    isNonVoting: false
  },
  "RCL.N0000": {
    symbol: "RCL.N0000",
    baseSymbol: "RCL",
    name: "Royal Ceramics Lanka PLC",
    sector: "Capital Goods",
    price: 40.2,
    isNonVoting: false
  },
  "REEF.N0000": {
    symbol: "REEF.N0000",
    baseSymbol: "REEF",
    name: "Citrus Leisure PLC",
    sector: "Consumer Services",
    price: 3.2,
    isNonVoting: false
  },
  "REG.N0000": {
    symbol: "REG.N0000",
    baseSymbol: "REG",
    name: "Regnis(lanka) PLC",
    sector: "Consumer Durables & Apparel",
    price: 0,
    isNonVoting: false
  },
  "RENU.N0000": {
    symbol: "RENU.N0000",
    baseSymbol: "RENU",
    name: "Renuka City Hotel PLC",
    sector: "Consumer Services",
    price: 704.25,
    isNonVoting: false
  },
  "REXP.N0000": {
    symbol: "REXP.N0000",
    baseSymbol: "REXP",
    name: "Richard Pieris Exports PLC",
    sector: "Materials",
    price: 290,
    isNonVoting: false
  },
  "RFL.N0000": {
    symbol: "RFL.N0000",
    baseSymbol: "RFL",
    name: "Ramboda Falls PLC",
    sector: "Consumer Services",
    price: 21.5,
    isNonVoting: false
  },
  "RGEM.N0000": {
    symbol: "RGEM.N0000",
    baseSymbol: "RGEM",
    name: "Radiant Gems International PLC",
    sector: "Consumer Durables & Apparel",
    price: 130,
    isNonVoting: false
  },
  "RHL.N0000": {
    symbol: "RHL.N0000",
    baseSymbol: "RHL",
    name: "Renuka Holdings PLC",
    sector: "Capital Goods",
    price: 34.4,
    isNonVoting: false
  },
  "RHTL.N0000": {
    symbol: "RHTL.N0000",
    baseSymbol: "RHTL",
    name: "The Fortress Resorts PLC",
    sector: "Consumer Services",
    price: 21.4,
    isNonVoting: false
  },
  "RICH.N0000": {
    symbol: "RICH.N0000",
    baseSymbol: "RICH",
    name: "Richard Pieris and Company PLC",
    sector: "Capital Goods",
    price: 25.4,
    isNonVoting: false
  },
  "RIL.N0000": {
    symbol: "RIL.N0000",
    baseSymbol: "RIL",
    name: "R I L Property PLC",
    sector: "Retailing",
    price: 19.9,
    isNonVoting: false
  },
  "RPBH.N0000": {
    symbol: "RPBH.N0000",
    baseSymbol: "RPBH",
    name: "Royal Palms Beach Hotels PLC",
    sector: "Consumer Services",
    price: 36.2,
    isNonVoting: false
  },
  "RWSL.N0000": {
    symbol: "RWSL.N0000",
    baseSymbol: "RWSL",
    name: "Raigam Wayamba Salterns PLC",
    sector: "Food, Beverage & Tobacco",
    price: 16.5,
    isNonVoting: false
  },
  "SAMP.N0000": {
    symbol: "SAMP.N0000",
    baseSymbol: "SAMP",
    name: "Sampath Bank PLC",
    sector: "Banks",
    price: 138,
    isNonVoting: false
  },
  "SCAP.N0000": {
    symbol: "SCAP.N0000",
    baseSymbol: "SCAP",
    name: "Softlogic Capital PLC",
    sector: "Insurance",
    price: 8,
    isNonVoting: false
  },
  "SDB.N0000": {
    symbol: "SDB.N0000",
    baseSymbol: "SDB",
    name: "Sanasa Development Bank PLC",
    sector: "Banks",
    price: 42.4,
    isNonVoting: false
  },
  "SDF.N0000": {
    symbol: "SDF.N0000",
    baseSymbol: "SDF",
    name: "Sarvodaya Development Finance PLC",
    sector: "Diversified Financials",
    price: 34.1,
    isNonVoting: false
  },
  "SEMB.N0000": {
    symbol: "SEMB.N0000",
    baseSymbol: "SEMB",
    name: "Smb Finance PLC",
    sector: "Diversified Financials",
    price: 1,
    isNonVoting: false
  },
  "SEMB.X0000": {
    symbol: "SEMB.X0000",
    baseSymbol: "SEMB",
    name: "Smb Finance PLC",
    sector: "Diversified Financials",
    price: 0.3,
    isNonVoting: true
  },
  "SERV.N0000": {
    symbol: "SERV.N0000",
    baseSymbol: "SERV",
    name: "The Kingsbury PLC",
    sector: "Consumer Services",
    price: 12.5,
    isNonVoting: false
  },
  "SEYB.N0000": {
    symbol: "SEYB.N0000",
    baseSymbol: "SEYB",
    name: "Seylan Bank PLC",
    sector: "Banks",
    price: 88.1,
    isNonVoting: false
  },
  "SEYB.X0000": {
    symbol: "SEYB.X0000",
    baseSymbol: "SEYB",
    name: "Seylan Bank PLC",
    sector: "Banks",
    price: 64,
    isNonVoting: true
  },
  "SFCL.N0000": {
    symbol: "SFCL.N0000",
    baseSymbol: "SFCL",
    name: "Senkadagala Finance PLC",
    sector: "Diversified Financials",
    price: 303.75,
    isNonVoting: false
  },
  "SFIN.N0000": {
    symbol: "SFIN.N0000",
    baseSymbol: "SFIN",
    name: "Singer Finance (lanka) PLC",
    sector: "Diversified Financials",
    price: 40,
    isNonVoting: false
  },
  "SHAW.N0000": {
    symbol: "SHAW.N0000",
    baseSymbol: "SHAW",
    name: "Lee Hedges PLC",
    sector: "Real Estate Management & Development",
    price: 261.5,
    isNonVoting: false
  },
  "SHL.N0000": {
    symbol: "SHL.N0000",
    baseSymbol: "SHL",
    name: "Softlogic Holdings PLC",
    sector: "Capital Goods",
    price: 5.9,
    isNonVoting: false
  },
  "SHOT.N0000": {
    symbol: "SHOT.N0000",
    baseSymbol: "SHOT",
    name: "Serendib Hotels PLC",
    sector: "Consumer Services",
    price: 14.1,
    isNonVoting: false
  },
  "SHOT.X0000": {
    symbol: "SHOT.X0000",
    baseSymbol: "SHOT",
    name: "Serendib Hotels PLC",
    sector: "Consumer Services",
    price: 11,
    isNonVoting: true
  },
  "SIGV.N0000": {
    symbol: "SIGV.N0000",
    baseSymbol: "SIGV",
    name: "Sigiriya Village Hotels PLC",
    sector: "Consumer Services",
    price: 11.3,
    isNonVoting: false
  },
  "SIL.N0000": {
    symbol: "SIL.N0000",
    baseSymbol: "SIL",
    name: "Samson International PLC",
    sector: "Materials",
    price: 520,
    isNonVoting: false
  },
  "SING.N0000": {
    symbol: "SING.N0000",
    baseSymbol: "SING",
    name: "Standard Capital PLC",
    sector: "Real Estate Management & Development",
    price: 41.2,
    isNonVoting: false
  },
  "SINH.N0000": {
    symbol: "SINH.N0000",
    baseSymbol: "SINH",
    name: "Singhe Hospitals PLC",
    sector: "Health Care Equipment & Services",
    price: 21.8,
    isNonVoting: false
  },
  "SINI.N0000": {
    symbol: "SINI.N0000",
    baseSymbol: "SINI",
    name: "Singer Industries (ceylon) PLC",
    sector: "Consumer Durables & Apparel",
    price: 0,
    isNonVoting: false
  },
  "SINS.N0000": {
    symbol: "SINS.N0000",
    baseSymbol: "SINS",
    name: "Singer (sri Lanka) PLC",
    sector: "Retailing",
    price: 68.2,
    isNonVoting: false
  },
  "SIRA.N0000": {
    symbol: "SIRA.N0000",
    baseSymbol: "SIRA",
    name: "Sierra Cables PLC",
    sector: "Capital Goods",
    price: 31.3,
    isNonVoting: false
  },
  "SLND.N0000": {
    symbol: "SLND.N0000",
    baseSymbol: "SLND",
    name: "Serendib Land PLC",
    sector: "Real Estate Management & Development",
    price: 2530.5,
    isNonVoting: false
  },
  "SLTL.N0000": {
    symbol: "SLTL.N0000",
    baseSymbol: "SLTL",
    name: "Sri Lanka Telecom PLC",
    sector: "Telecommunication Services",
    price: 78.4,
    isNonVoting: false
  },
  "SMOT.N0000": {
    symbol: "SMOT.N0000",
    baseSymbol: "SMOT",
    name: "Sathosa Motors PLC",
    sector: "Retailing",
    price: 1398,
    isNonVoting: false
  },
  "SOY.N0000": {
    symbol: "SOY.N0000",
    baseSymbol: "SOY",
    name: "Convenience Foods (lanka )PLC",
    sector: "Food, Beverage & Tobacco",
    price: 1910.25,
    isNonVoting: false
  },
  "SPEN.N0000": {
    symbol: "SPEN.N0000",
    baseSymbol: "SPEN",
    name: "Aitken Spence PLC",
    sector: "Capital Goods",
    price: 131.25,
    isNonVoting: false
  },
  "STAF.N0000": {
    symbol: "STAF.N0000",
    baseSymbol: "STAF",
    name: "Dolphin Hotels PLC",
    sector: "Consumer Services",
    price: 37.1,
    isNonVoting: false
  },
  "SUN.N0000": {
    symbol: "SUN.N0000",
    baseSymbol: "SUN",
    name: "Sunshine Holdings PLC",
    sector: "Food, Beverage & Tobacco",
    price: 27,
    isNonVoting: false
  },
  "SWAD.N0000": {
    symbol: "SWAD.N0000",
    baseSymbol: "SWAD",
    name: "Swadeshi Industrial Works PLC",
    sector: "Household & Personal Products",
    price: 15103.25,
    isNonVoting: false
  },
  "TAFL.N0000": {
    symbol: "TAFL.N0000",
    baseSymbol: "TAFL",
    name: "Three Acre Farms PLC",
    sector: "Food, Beverage & Tobacco",
    price: 609.25,
    isNonVoting: false
  },
  "TAJ.N0000": {
    symbol: "TAJ.N0000",
    baseSymbol: "TAJ",
    name: "TAL Lanka Hotels PLC",
    sector: "Consumer Services",
    price: 25.2,
    isNonVoting: false
  },
  "TANG.N0000": {
    symbol: "TANG.N0000",
    baseSymbol: "TANG",
    name: "Tangerine Beach Hotels PLC",
    sector: "Consumer Services",
    price: 97,
    isNonVoting: false
  },
  "TAP.N0000": {
    symbol: "TAP.N0000",
    baseSymbol: "TAP",
    name: "Ambeon Capital PLC",
    sector: "Consumer Durables & Apparel",
    price: 28,
    isNonVoting: false
  },
  "TESS.N0000": {
    symbol: "TESS.N0000",
    baseSymbol: "TESS",
    name: "TESS Agro PLC",
    sector: "Retailing",
    price: 1.6,
    isNonVoting: false
  },
  "TESS.X0000": {
    symbol: "TESS.X0000",
    baseSymbol: "TESS",
    name: "TESS Agro PLC",
    sector: "Retailing",
    price: 1.4,
    isNonVoting: true
  },
  "TILE.N0000": {
    symbol: "TILE.N0000",
    baseSymbol: "TILE",
    name: "Lanka Tiles PLC",
    sector: "Capital Goods",
    price: 38.8,
    isNonVoting: false
  },
  "TJL.N0000": {
    symbol: "TJL.N0000",
    baseSymbol: "TJL",
    name: "Teejay Lanka PLC",
    sector: "Consumer Durables & Apparel",
    price: 28,
    isNonVoting: false
  },
  "TKYO.N0000": {
    symbol: "TKYO.N0000",
    baseSymbol: "TKYO",
    name: "Tokyo Cement Company (lanka) PLC",
    sector: "Materials",
    price: 74,
    isNonVoting: false
  },
  "TKYO.X0000": {
    symbol: "TKYO.X0000",
    baseSymbol: "TKYO",
    name: "Tokyo Cement Company (lanka) PLC",
    sector: "Materials",
    price: 57.5,
    isNonVoting: true
  },
  "TPL.N0000": {
    symbol: "TPL.N0000",
    baseSymbol: "TPL",
    name: "Talawakelle TEA Estates PLC",
    sector: "Food, Beverage & Tobacco",
    price: 125.75,
    isNonVoting: false
  },
  "TRAN.N0000": {
    symbol: "TRAN.N0000",
    baseSymbol: "TRAN",
    name: "Trans Asia Hotels PLC",
    sector: "Consumer Services",
    price: 44,
    isNonVoting: false
  },
  "TSML.N0000": {
    symbol: "TSML.N0000",
    baseSymbol: "TSML",
    name: "TEA Smallholder Factories PLC",
    sector: "Food, Beverage & Tobacco",
    price: 30.2,
    isNonVoting: false
  },
  "TYRE.N0000": {
    symbol: "TYRE.N0000",
    baseSymbol: "TYRE",
    name: "Kelani Tyres PLC",
    sector: "Automobiles & Components",
    price: 80.5,
    isNonVoting: false
  },
  "UAL.N0000": {
    symbol: "UAL.N0000",
    baseSymbol: "UAL",
    name: "UNION Assurance PLC",
    sector: "Insurance",
    price: 66.1,
    isNonVoting: false
  },
  "UBC.N0000": {
    symbol: "UBC.N0000",
    baseSymbol: "UBC",
    name: "UNION Bank of Colombo PLC",
    sector: "Banks",
    price: 10.5,
    isNonVoting: false
  },
  "UBF.N0000": {
    symbol: "UBF.N0000",
    baseSymbol: "UBF",
    name: "Ub Finance PLC",
    sector: "Diversified Financials",
    price: 1.9,
    isNonVoting: false
  },
  "UCAR.N0000": {
    symbol: "UCAR.N0000",
    baseSymbol: "UCAR",
    name: "UNION Chemicals Lanka PLC",
    sector: "Materials",
    price: 2295.25,
    isNonVoting: false
  },
  "UDPL.N0000": {
    symbol: "UDPL.N0000",
    baseSymbol: "UDPL",
    name: "Udapussellawa Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 126,
    isNonVoting: false
  },
  "UML.N0000": {
    symbol: "UML.N0000",
    baseSymbol: "UML",
    name: "United Motors Lanka PLC",
    sector: "Retailing",
    price: 22.1,
    isNonVoting: false
  },
  "VFIN.N0000": {
    symbol: "VFIN.N0000",
    baseSymbol: "VFIN",
    name: "Vallibel Finance PLC",
    sector: "Diversified Financials",
    price: 75.7,
    isNonVoting: false
  },
  "VLL.N0000": {
    symbol: "VLL.N0000",
    baseSymbol: "VLL",
    name: "Vidullanka PLC",
    sector: "Utilities",
    price: 21.4,
    isNonVoting: false
  },
  "VLL.X0000": {
    symbol: "VLL.X0000",
    baseSymbol: "VLL",
    name: "Vidullanka PLC",
    sector: "Utilities",
    price: 19.1,
    isNonVoting: true
  },
  "VONE.N0000": {
    symbol: "VONE.N0000",
    baseSymbol: "VONE",
    name: "Vallibel One PLC",
    sector: "Utilities",
    price: 84,
    isNonVoting: false
  },
  "VPEL.N0000": {
    symbol: "VPEL.N0000",
    baseSymbol: "VPEL",
    name: "Vallibel Power Erathna PLC",
    sector: "Utilities",
    price: 14.1,
    isNonVoting: false
  },
  "WAPO.N0000": {
    symbol: "WAPO.N0000",
    baseSymbol: "WAPO",
    name: "Galle Face Capital Partners PLC",
    sector: "Diversified Financials",
    price: 15.2,
    isNonVoting: false
  },
  "WATA.N0000": {
    symbol: "WATA.N0000",
    baseSymbol: "WATA",
    name: "Watawala Plantations PLC",
    sector: "Food, Beverage & Tobacco",
    price: 46.7,
    isNonVoting: false
  },
  "WIND.N0000": {
    symbol: "WIND.N0000",
    baseSymbol: "WIND",
    name: "Windforce PLC",
    sector: "Utilities",
    price: 36.2,
    isNonVoting: false
  },
  "WLTH.N0000": {
    symbol: "WLTH.N0000",
    baseSymbol: "WLTH",
    name: "Wealthtrust Securities PLC",
    sector: "Diversified Financials",
    price: 9.8,
    isNonVoting: false
  },
  "YORK.N0000": {
    symbol: "YORK.N0000",
    baseSymbol: "YORK",
    name: "YORK Arcade Holdings PLC",
    sector: "Real Estate Management & Development",
    price: 6.6,
    isNonVoting: false
  }
};

// Aliases for common user searches (e.g. HEMA -> HHL)
export const CSE_SYMBOL_ALIASES: Record<string, string> = {
  'HEMA.N0000': 'HHL.N0000',
  'HEMA': 'HHL.N0000',
  'TJST.N0000': 'TJL.N0000',
  'TJST': 'TJL.N0000',
};

export const POPULAR_CSE_EQUITIES: string[] = [
  'COMB.N0000',
  'JKH.N0000',
  'SAMP.N0000',
  'HNB.N0000',
  'HAYL.N0000',
  'DIAL.N0000',
  'CALT.N0000',
  'ACL.N0000',
  'TILE.N0000',
  'LOLC.N0000',
  'RCL.N0000',
  'TJL.N0000'
];

/**
 * Normalizes input and attempts to find a matching CSE stock.
 * Handles forms like:
 * - "COMB.N" -> "COMB.N0000"
 * - "COMB.X" -> "COMB.X0000"
 * - "COMB.N0000"
 * - "comb.n"
 * - "COMB" -> returns voting share "COMB.N0000"
 */
export function findCseStock(rawQuery: string): CseStockInfo | null {
  if (!rawQuery) return null;
  const q = rawQuery.trim().toUpperCase();

  // Alias lookup first
  const aliased = CSE_SYMBOL_ALIASES[q];
  if (aliased && CSE_STOCKS_DATA[aliased]) {
    return CSE_STOCKS_DATA[aliased];
  }

  // Direct symbol match
  if (CSE_STOCKS_DATA[q]) {
    return CSE_STOCKS_DATA[q];
  }

  // Handle auto-completion of .N or .X: "COMB.N" -> "COMB.N0000"
  if (/^[A-Z0-9]+\.[NX]$/.test(q)) {
    const expanded = `${q}0000`;
    const aliasExpanded = CSE_SYMBOL_ALIASES[expanded] || expanded;
    if (CSE_STOCKS_DATA[aliasExpanded]) {
      return CSE_STOCKS_DATA[aliasExpanded];
    }
  }

  // Handle partial zeroes: "COMB.N0", "COMB.N00", "COMB.N000"
  if (/^[A-Z0-9]+\.[NX]0{1,3}$/.test(q)) {
    const dotIdx = q.indexOf('.');
    const basePart = q.slice(0, dotIdx + 2);
    const expanded = `${basePart}0000`;
    const aliasExpanded = CSE_SYMBOL_ALIASES[expanded] || expanded;
    if (CSE_STOCKS_DATA[aliasExpanded]) {
      return CSE_STOCKS_DATA[aliasExpanded];
    }
  }

  // Match by base symbol (e.g. "COMB" -> prefers "COMB.N0000")
  const defaultVoting = `${q}.N0000`;
  const aliasVoting = CSE_SYMBOL_ALIASES[defaultVoting] || defaultVoting;
  if (CSE_STOCKS_DATA[aliasVoting]) {
    return CSE_STOCKS_DATA[aliasVoting];
  }

  // Match by base symbol directly
  const byBase = Object.values(CSE_STOCKS_DATA).find(
    (s) => s.baseSymbol.toUpperCase() === q && !s.isNonVoting
  );
  if (byBase) return byBase;

  // Exact company name match
  const byName = Object.values(CSE_STOCKS_DATA).find(
    (s) => s.name.toUpperCase() === q
  );
  if (byName) return byName;

  return null;
}

/**
 * Searches CSE stocks for autocomplete dropdown.
 */
export function searchCseStocks(query: string, maxResults = 8): CseStockInfo[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toUpperCase();
  const all = Object.values(CSE_STOCKS_DATA);

  // Exact symbol start
  const exactPrefix = all.filter((s) => s.symbol.startsWith(q));
  if (exactPrefix.length >= maxResults) return exactPrefix.slice(0, maxResults);

  // Base symbol match
  const baseMatches = all.filter(
    (s) => s.baseSymbol.startsWith(q) && !exactPrefix.includes(s)
  );

  // Name matches
  const nameMatches = all.filter(
    (s) => s.name.toUpperCase().includes(q) && !exactPrefix.includes(s) && !baseMatches.includes(s)
  );

  return [...exactPrefix, ...baseMatches, ...nameMatches].slice(0, maxResults);
}

/**
 * If query is like "COMB.N" or "comb.n", returns "COMB.N0000"
 */
export function getAutoCompletedSymbol(input: string): string {
  if (!input) return input;
  const upper = input.trim().toUpperCase();
  if (/^[A-Z0-9]+\.[NX]$/.test(upper)) {
    return `${upper}0000`;
  }
  return upper;
}

const CSE_ACRONYMS = new Set([
  'PLC', 'LTD', 'LLC', 'ACL', 'DFCC', 'HNB', 'JKH', 'LOLC', 'NDB', 'NTB', 'PABC', 'UBC',
  'CIC', 'JAT', 'TJL', 'CALT', 'FCT', 'CDB', 'LB', 'DIMO', 'BPPL', 'AMW', 'BFL', 'CCS',
  'RCL', 'LIOC', 'SLTL', 'CTC', 'MCB', 'BOC', 'NSB', 'CINS', 'AEL', 'DIPD', 'AGST', 'AGAL',
  'CFIN', 'LFIN', 'VFIN', 'SFIN', 'LOFC', 'CHEV', 'LLUB', 'ODEL', 'HHL'
]);

export function toCleanTitle(str: string): string {
  if (!str) return '';
  const minor = new Set(['of', 'and', 'the', 'in', 'on', 'for', 'to', 'a', 'an', '&']);
  return str
    .split(' ')
    .filter(Boolean)
    .map((word, idx) => {
      const cleanUpper = word.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
      if (CSE_ACRONYMS.has(cleanUpper)) {
        return word.toUpperCase();
      }
      if (word.toUpperCase() === '(NON-VOTING)') return '(Non-Voting)';
      if (word.toUpperCase() === '(VOTING)') return '(Voting)';
      const lower = word.toLowerCase();
      if (idx > 0 && minor.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function normalizeSector(sec: string): string {
  if (!sec) return 'General';
  const s = sec.trim().toUpperCase();
  if (s.includes('BANK') && !s.includes('INVESTMENT') && !s.includes('BROKERAGE')) return 'Banks';
  if (s.includes('CAPITAL GOODS') || s.includes('INDUSTRIAL')) return 'Capital Goods';
  if (s.includes('STAPLES RETAIL')) return 'Food & Staples Retailing';
  if (s.includes('FOOD') || s.includes('BEVERAGE') || s.includes('TOBACCO')) return 'Food, Beverage & Tobacco';
  if (s.includes('DIVERSIFIED FINANCIAL') || s.includes('INVESTMENT BANKING') || s.includes('BROKERAGE') || s.includes('CONSUMER FINANCE')) return 'Diversified Financials';
  if (s.includes('INSURANCE')) return 'Insurance';
  if (s.includes('HEALTH')) return 'Health Care Equipment & Services';
  if (s.includes('DURABLES') || s.includes('APPAREL')) return 'Consumer Durables & Apparel';
  if (s.includes('CONSUMER SERVICES')) return 'Consumer Services';
  if (s.includes('RETAIL') || s.includes('TRADING')) return 'Retailing';
  if (s.includes('REAL ESTATE')) return 'Real Estate Management & Development';
  if (s.includes('MATERIAL')) return 'Materials';
  if (s.includes('TELECOM')) return 'Telecommunication Services';
  if (s.includes('UTILITIES') || s.includes('POWER') || s.includes('ENERGY TRADER')) return 'Utilities';
  if (s.includes('ENERGY') && !s.includes('POWER')) return 'Energy';
  if (s.includes('TRANSPORT')) return 'Transportation';
  if (s.includes('COMMERCIAL') || s.includes('PROFESSIONAL') || s.includes('SERVICES')) return 'Commercial & Professional Services';
  if (s.includes('AUTOMOBILE')) return 'Automobiles & Components';
  if (s.includes('HOUSEHOLD') || s.includes('PERSONAL')) return 'Household & Personal Products';
  if (s.includes('SOFTWARE') || s.includes('45103010')) return 'Software & Services';
  return 'General';
}

/**
 * Fetches company profile live from CSE if not in static database.
 */
export async function fetchLiveCseStock(symbol: string): Promise<CseStockInfo | null> {
  const normSym = getAutoCompletedSymbol(symbol);
  try {
    const endpoints = [
      `/api/cse/companyProfile?symbol=${encodeURIComponent(normSym)}`,
      `https://www.cse.lk/api/companyProfile?symbol=${encodeURIComponent(normSym)}`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: '{}'
        });
        if (res.ok) {
          const data = await res.json();
          const info = data.reqComSumInfo?.[0];
          if (info && info.name) {
            return {
              symbol: normSym,
              baseSymbol: normSym.split('.')[0],
              name: toCleanTitle(info.name),
              sector: normalizeSector(info.sector || 'General'),
              price: 0,
              isNonVoting: normSym.includes('.X')
            };
          }
        }
      } catch {
        // try next
      }
    }
  } catch {
    // Ignore network error
  }
  return null;
}

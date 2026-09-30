export const ChartPalettes = {
  Default: {
    'Equities': '#2C2260',
    'Fixed Deposits': '#10B981',
    'Unit Trusts': '#3B82F6',
    'Crypto Currency': '#8B5CF6',
    'Gold & Other': '#D4AF37',
    'Gold': '#D4AF37',
    'Other': '#64748B'
  },
  DefaultDark: {
    'Equities': '#A78BFA',
    'Fixed Deposits': '#10B981',
    'Unit Trusts': '#60A5FA',
    'Crypto Currency': '#FB923C',
    'Gold & Other': '#FBBF24',
    'Gold': '#FBBF24',
    'Other': '#94A3B8'
  },
  Vibrant: {
    'Equities': '#FF5722',
    'Fixed Deposits': '#9C27B0',
    'Unit Trusts': '#2196F3',
    'Crypto Currency': '#4CAF50',
    'Gold & Other': '#FFC107',
    'Gold': '#FFC107',
    'Other': '#78716C'
  },
  VibrantDark: {
    'Equities': '#FF7043',
    'Fixed Deposits': '#BA68C8',
    'Unit Trusts': '#42A5F5',
    'Crypto Currency': '#66BB6A',
    'Gold & Other': '#FFD54F',
    'Gold': '#FFD54F',
    'Other': '#A8A29E'
  },
  Ocean: {
    'Equities': '#0077B6',
    'Fixed Deposits': '#00B4D8',
    'Unit Trusts': '#90E0EF',
    'Crypto Currency': '#03045E',
    'Gold & Other': '#CAF0F8',
    'Gold': '#E0A96D',
    'Other': '#48CAE4'
  },
  OceanDark: {
    'Equities': '#38BDF8',
    'Fixed Deposits': '#22D3EE',
    'Unit Trusts': '#7DD3FC',
    'Crypto Currency': '#FB923C',
    'Gold & Other': '#BAE6FD',
    'Gold': '#FBBF24',
    'Other': '#38BDF8'
  }
};

export const SectorPalettes = {
  SectorDefault: [
    '#4A3B8C', '#2E8B57', '#D4AF37', '#3B82F6', '#8B5CF6',
    '#F59E0B', '#10B981', '#F43F5E', '#6366F1', '#14B8A6'
  ],
  SectorDefaultDark: [
    '#A78BFA', '#34D399', '#FBBF24', '#60A5FA', '#C084FC',
    '#F59E0B', '#10B981', '#FB7185', '#818CF8', '#2DD4BF'
  ],
  SectorVibrant: [
    '#E91E63', '#9C27B0', '#3F51B5', '#00BCD4',
    '#4CAF50', '#FFEB3B', '#FF9800', '#795548'
  ],
  SectorOcean: [
    '#03045E', '#0077B6', '#00B4D8', '#90E0EF',
    '#CAF0F8', '#48CAE4', '#0096C7', '#023E8A'
  ]
};

export function getPalette(name: string, isDark: boolean): Record<string, string> {
  if (isDark) {
    switch (name) {
      case 'Vibrant': return ChartPalettes.VibrantDark;
      case 'Ocean': return ChartPalettes.OceanDark;
      default: return ChartPalettes.DefaultDark;
    }
  } else {
    switch (name) {
      case 'Vibrant': return ChartPalettes.Vibrant;
      case 'Ocean': return ChartPalettes.Ocean;
      default: return ChartPalettes.Default;
    }
  }
}

export function getSectorPalette(name: string, isDark: boolean): string[] {
  if (isDark) {
    switch (name) {
      case 'Vibrant': return SectorPalettes.SectorVibrant;
      case 'Ocean': return SectorPalettes.SectorOcean;
      default: return SectorPalettes.SectorDefaultDark;
    }
  } else {
    switch (name) {
      case 'Vibrant': return SectorPalettes.SectorVibrant;
      case 'Ocean': return SectorPalettes.SectorOcean;
      default: return SectorPalettes.SectorDefault;
    }
  }
}

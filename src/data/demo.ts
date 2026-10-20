// All example values are intentionally separate from future official-source adapters.
export const snapshot = {
  label: 'Illustrative snapshot',
  date: 'October 19, 2026',
  phase: 'El Niño',
  weeklyAnomaly: 1.4,
  seasonalIndex: 0.9,
};

export const seasons = ['OND', 'NDJ', 'DJF', 'JFM', 'FMA', 'MAM'];
export const probabilities = {
  current: { nina: [5, 5, 5, 8, 15, 20], neutral: [15, 13, 17, 27, 40, 50], nino: [80, 82, 78, 65, 45, 30] },
  previous: { nina: [5, 5, 8, 10, 18, 25], neutral: [23, 20, 24, 33, 45, 50], nino: [72, 75, 68, 57, 37, 25] },
};

export const weeklyValues = [-0.42, -0.48, -0.53, -0.49, -0.58, -0.63, -0.55, -0.66, -0.61, -0.68, -0.59, -0.64, -0.57, -0.63, -0.59, -0.6, -0.55, -0.6, -0.45, -0.42, -0.3, -0.28, -0.18, -0.2, -0.08, 0.02, -0.04, 0.09, 0.18, 0.13, 0.22, 0.31, 0.29, 0.42, 0.51, 0.48, 0.63, 0.72, 0.68, 0.77, 0.83, 0.82, 0.98, 1.04, 0.98, 1.12, 1.19, 1.14, 1.25, 1.32, 1.29, 1.4];
export const monthlyValues = [-0.42, -0.5, -0.55, -0.5, -0.38, -0.2, -0.02, 0.2, 0.41, 0.58, 0.74, 0.9];

export const sources = [
  { name: 'CPC ENSO Diagnostic Discussion', type: 'Official status & discussion', href: 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml' },
  { name: 'CPC weekly sea surface temperatures', type: 'Weekly Niño-region observations', href: 'https://www.cpc.ncep.noaa.gov/data/indices/wksst9120.for' },
  { name: 'CPC Relative Oceanic Niño Index', type: 'Seasonal RONI & historical record', href: 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/' },
  { name: 'CPC ENSO probability outlook', type: 'Official seasonal probabilities', href: 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/outlook/' },
  { name: 'CPC seasonal outlooks', type: 'U.S. temperature & precipitation', href: 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/' },
];

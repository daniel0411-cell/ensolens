import type { WeeklyPoint } from './enso';

export function latestAnnualSeries(points: WeeklyPoint[]) {
  const year = Number(points.at(-1)!.date.slice(0, 4));
  const start = Date.UTC(year, 0, 1);
  return {
    year,
    current: points.filter(point => point.date.startsWith(String(year))).map(point => ({
      ...point,
      week: Math.floor((Date.parse(point.date + 'T00:00:00Z') - start) / (7 * 86400000)) + 1,
    })),
  };
}

export function weeklyPeak<T extends { anomaly: number; date: string }>(points: T[], cold: boolean): T {
  return points.reduce((peak, point) => (cold ? point.anomaly < peak.anomaly : point.anomaly > peak.anomaly) ? point : peak);
}

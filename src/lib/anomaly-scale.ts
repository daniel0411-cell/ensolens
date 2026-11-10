export function anomalyScale(anomaly: number) {
  if (!Number.isFinite(anomaly)) throw new Error('Anomaly must be finite');
  // Leave at least half a degree of headroom and keep zero at the midpoint.
  const limit = Math.max(2, Math.ceil(Math.abs(anomaly) + 0.5));
  return { limit, position: (anomaly + limit) / (2 * limit) * 100 };
}

// Calendar bins preserve January alignment even when the feed starts midyear.
export function calendarWeek(date: string): number {
  const year = Number(date.slice(0, 4));
  return Math.floor((Date.parse(date + 'T00:00:00Z') - Date.UTC(year, 0, 1)) / 604800000) + 1;
}

export function historicalView(snapshot: import('./enso').Snapshot, stale: string[]) {
  const latest = snapshot.weekly.data.at(-1);
  const year = latest?.date.slice(0, 4) ?? null;
  return { year, latestDate: latest?.date ?? null, stale,
    checkedAt: snapshot.weekly.checkedAt, retrievedAt: snapshot.weekly.retrievedAt,
    current: snapshot.weekly.data.filter(p => p.date.slice(0,4) === year).map(p => ({ ...p, week: calendarWeek(p.date) })) };
}

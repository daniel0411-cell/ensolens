// Calendar bins preserve January alignment even when the feed starts midyear.
export function calendarWeek(date: string): number {
  const year = Number(date.slice(0, 4));
  return Math.floor((Date.parse(date + 'T00:00:00Z') - Date.UTC(year, 0, 1)) / 604800000) + 1;
}

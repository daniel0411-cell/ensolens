import { previousIssue, type Forecast, type Probability } from './enso.ts';

const phases = ['nina', 'neutral', 'nino'] as const;
export const phaseNames = { nina: 'La Niña', neutral: 'Neutral', nino: 'El Niño' };

/** Compare only the same seasonal target, including its center year. */
export function forecastChanges(current: Forecast, previous: Forecast | null) {
  if (!previous || previous.issue !== previousIssue(current.issue)) {
    return { available: false, matched: 0, unmatched: current.rows.length, changes: [] };
  }
  const changes: { row: Probability; phase: typeof phases[number]; before: number; after: number; delta: number }[] = [];
  let matched = 0;
  for (const row of current.rows) {
    const prior = previous.rows.find(p => p.key === row.key && p.year === row.year && p.season === row.season);
    if (!prior) continue;
    matched++;
    for (const phase of phases) {
      const delta = row[phase] - prior[phase];
      if (delta !== 0) changes.push({ row, phase, before: prior[phase], after: row[phase], delta });
    }
  }
  changes.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  return { available: true, matched, unmatched: current.rows.length - matched, changes };
}

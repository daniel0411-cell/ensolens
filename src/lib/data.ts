import seed from '../data/official.json';
import { freshness, type RuntimeEnv, type Snapshot } from './enso';

export async function getSnapshot(env: RuntimeEnv): Promise<Snapshot> {
  try {
    const current = await env.ENSO_CACHE?.get<Snapshot>('snapshot:v1', 'json');
    if (current?.schema === 1) return current;
  } catch { /* The dated build snapshot remains available during a storage outage. */ }
  return seed as Snapshot;
}
export async function getData(env: RuntimeEnv) {
  const snapshot = await getSnapshot(env);
  return { snapshot, stale: freshness(snapshot) };
}

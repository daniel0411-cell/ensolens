import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { refreshSnapshot } from '../src/lib/enso.ts';

const path = new URL('../src/data/official.json', import.meta.url);
let prior = null;
try { prior = JSON.parse(await readFile(path, 'utf8')); } catch {}
const snapshot = await refreshSnapshot(prior);
if (Object.values(snapshot).some(feed => feed?.error)) throw new Error('Source checks failed; build snapshot was not overwritten');
await mkdir(new URL('../src/data/', import.meta.url), { recursive: true });
await writeFile(path, JSON.stringify(snapshot, null, 2) + '\n');
console.log(JSON.stringify({ discussion: snapshot.discussion.data.issued, weekly: snapshot.weekly.data.at(-1), roni: snapshot.roni.data.at(-1), forecast: snapshot.forecast.data.issue, previous: snapshot.previous?.issue, retrievedAt: snapshot.discussion.retrievedAt }, null, 2));

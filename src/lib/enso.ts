import { load } from 'cheerio/slim';
import { Buffer } from 'node:buffer';

export const urls = {
  discussion: 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml',
  weekly: 'https://www.cpc.ncep.noaa.gov/data/indices/wksst9120.for',
  roni: 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/',
  forecast: 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/probabilities/',
  map: 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/figure01.gif',
};
export const seasonNames = ['DJF', 'JFM', 'FMA', 'MAM', 'AMJ', 'MJJ', 'JJA', 'JAS', 'ASO', 'SON', 'OND', 'NDJ'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const day = 86_400_000;
export interface WeeklyPoint { date: string; anomaly: number; sst: number }
export interface SeasonalPoint { season: string; year: number; date: string; value: number }
export interface Probability { season: string; year: number; key: string; nina: number; neutral: number; nino: number }
export interface Forecast { issue: string; source: string; rows: Probability[] }
export interface Discussion { issued: string; next: string; alert: string; phase: string; synopsis: string }
export interface Feed<T> { data: T; checkedAt: string; retrievedAt: string; error: string | null }
export interface OceanImage { version: string; base64: string; issued: string }
export interface Snapshot {
  schema: 1;
  discussion: Feed<Discussion>;
  weekly: Feed<WeeklyPoint[]>;
  roni: Feed<SeasonalPoint[]>;
  forecast: Feed<Forecast>;
  previous: Forecast | null;
  map: Feed<OceanImage>;
}
export interface KVStore {
  get<T>(key: string, type: 'json'): Promise<T | null>;
  put(key: string, value: string): Promise<void>;
}
export interface RuntimeEnv { ENSO_CACHE?: KVStore; INDEXING_ENABLED?: string; CONTACT_ENABLED?: string }
const clean = (value: string) => value.replace(/\s+/g, ' ').trim();

function requireValue(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function isoDate(year: number, month: number, date: number) {
  const value = new Date(Date.UTC(year, month, date));
  requireValue(value.getUTCFullYear() === year && value.getUTCMonth() === month && value.getUTCDate() === date, 'Invalid source date');
  return value.toISOString().slice(0, 10);
}
function sourceDate(text: string) {
  const m = clean(text).match(/\b(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (20\d{2})\b/);
  requireValue(m, 'Publication date missing');
  return isoDate(+m[3], months.indexOf(m[2]), +m[1]);
}
function dateNotFuture(date: string, now = new Date()) {
  requireValue(Date.parse(date) <= now.getTime() + day, 'Source contains a future date');
}

export function parseWeekly(text: string, now = new Date()): WeeklyPoint[] {
  requireValue(/Nino34/.test(text), 'Weekly column header changed');
  const result: WeeklyPoint[] = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*(\d{2})([A-Z]{3})(\d{4})\s+(.*)$/);
    if (!m) continue;
    // NOAA fixed-width fields can join the SST and a negative anomaly (e.g. 20.6-0.1).
    const values = m[4].match(/[+-]?\d+\.\d+/g)?.map(Number);
    requireValue(values?.length === 8, 'Invalid weekly data row');
    const month = months.findIndex(value => value.toUpperCase().startsWith(m[2]));
    requireValue(month >= 0, 'Invalid weekly month');
    const date = isoDate(+m[3], month, +m[1]);
    dateNotFuture(date, now);
    requireValue(values[4] > 0 && values[4] < 40 && Math.abs(values[5]) < 10, 'Weekly value outside physical range');
    requireValue(!result.length || date > result.at(-1)!.date, 'Weekly dates not ordered');
    result.push({ date, sst: values[4], anomaly: values[5] });
  }
  requireValue(result.length >= 52, 'Weekly history incomplete');
  return result.slice(-106);
}

export function parseRoni(html: string, now = new Date()): SeasonalPoint[] {
  const $ = load(html);
  requireValue($.text().includes('ERSSTv6') && $.text().includes('1991'), 'RONI data version changed');
  const result: SeasonalPoint[] = [];
  $('#roni-v5-table2 tr').each((_, tr) => {
    const yearText = clean($(tr).find('th[scope="row"]').text());
    if (!/^\d{4}$/.test(yearText)) return;
    const year = +yearText;
    $(tr).find('td').each((index, cell) => {
      const text = clean($(cell).text());
      if (!text || /^(?:NA|-{2,})$/i.test(text)) return;
      requireValue(index < 12 && /^-?\d+(\.\d+)?$/.test(text), 'Invalid RONI cell');
      const value = Number(text);
      const date = new Date(Date.UTC(year, index + 2, 0)).toISOString().slice(0, 10);
      dateNotFuture(date, now);
      requireValue(Math.abs(value) < 10, 'Invalid RONI range');
      result.push({ season: seasonNames[index], year, date, value });
    });
  });
  requireValue(result.length >= 24, 'RONI table missing or incomplete');
  return result.slice(-36);
}

export function parseDiscussion(html: string, now = new Date()): Discussion {
  const $ = load(html);
  const text = clean($.text());
  const issueText = text.split('ENSO Alert System Status:')[0];
  const issued = sourceDate(issueText);
  dateNotFuture(issued, now);
  const nextText = text.match(/next ENSO Diagnostics Discussion is scheduled for (\d{1,2} \w+ 20\d{2})/i)?.[1];
  requireValue(nextText, 'Next official release date missing');
  const next = sourceDate(nextText);
  requireValue(next > issued && Date.parse(next) - Date.parse(issued) < 50 * day, 'Invalid next release date');
  const alert = clean($('a[href*="enso-alert-readme"]').first().text());
  requireValue(/^(?:El Niño|La Niña) (?:Advisory|Watch)$|^Not Active$/i.test(alert), 'Unknown ENSO alert status');
  const synopsis = text.match(/Synopsis:\s*(.*?)\s*(?:El Niño|La Niña|ENSO-neutral|ENSO neutral|During|In|Over|Sea surface)/)?.[1];
  const synopsisNode = $('u').filter((_, el) => $(el).text().includes('Synopsis')).first().parent().find('strong').first();
  const summary = clean(synopsisNode.text()) || synopsis || '';
  requireValue(summary.length > 30 && summary.length < 2000, 'ENSO synopsis missing');
  // A Watch concerns a possible future phase, so it must never become a current phase label.
  let phase = alert === 'El Niño Advisory' ? 'El Niño' : alert === 'La Niña Advisory' ? 'La Niña' : 'See CPC discussion';
  if (phase === 'See CPC discussion' && /ENSO[- ]neutral (?:conditions )?(?:continued|persisted|were present|are present)/i.test(text)) phase = 'ENSO-neutral';
  return { issued, next, alert, phase, synopsis: summary };
}

export function parseForecast(html: string, source = urls.forecast, now = new Date()): Forecast {
  const $ = load(html);
  const heading = clean($('h2').text());
  const m = heading.match(/Issued (\w+) (20\d{2})/);
  requireValue(m && months.includes(m[1]), 'Forecast issue date missing');
  const month = months.indexOf(m[1]);
  const issue = `${m[2]}-${String(month + 1).padStart(2, '0')}`;
  dateNotFuture(`${issue}-01`, now);
  requireValue($.text().includes('Relative Oceanic') && $.text().includes('1991'), 'Forecast index or baseline changed');
  const rows: Probability[] = [];
  $('#probabilities-table tr').each((_, tr) => {
    const cells = $(tr).find('td');
    if (!cells.length) return;
    const season = clean($(tr).find('th abbr').clone().children().remove().end().text());
    const index = seasonNames.indexOf(season);
    requireValue(index >= 0 && cells.length === 3, 'Invalid forecast season');
    const values = cells.map((_, td) => {
      const text = clean($(td).text());
      requireValue(/^\d+(?:\.\d+)?$/.test(text), 'Missing or invalid probability');
      return Number(text);
    }).get();
    requireValue(values.every(n => Number.isFinite(n) && n >= 0 && n <= 100) && Math.abs(values.reduce((a, b) => a + b, 0) - 100) <= 1, 'Forecast probabilities must sum to 100');
    // The first target is centered in the issue month; year belongs to the center month.
    const target = new Date(Date.UTC(+m[2], month + rows.length, 1));
    requireValue(target.getUTCMonth() === index, 'Forecast seasons are not consecutive from issue month');
    const year = target.getUTCFullYear();
    rows.push({ season, year, key: `${year}-${String(index + 1).padStart(2, '0')}`, nina: values[0], neutral: values[1], nino: values[2] });
  });
  requireValue(rows.length === 9, 'Expected nine forecast seasons');
  return { issue, source, rows };
}

export function previousIssue(issue: string) {
  const date = new Date(`${issue}-01T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() - 1);
  return date.toISOString().slice(0, 7);
}
export function previousForecastUrl(issue: string) {
  const prior = previousIssue(issue);
  return `https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/archives/?type=probabilities&month=${prior.slice(5)}&year=${prior.slice(0, 4)}`;
}

export async function fetchOfficial(url: string, fetcher: typeof fetch = fetch) {
  const parsed = new URL(url);
  requireValue(parsed.protocol === 'https:' && parsed.hostname === 'www.cpc.ncep.noaa.gov', 'Unexpected upstream host');
  const response = await fetcher(url, { headers: { 'User-Agent': 'ENSOLens/1.0 (https://ensolens.com/about/)' }, signal: AbortSignal.timeout(18000), redirect: 'manual' });
  requireValue(response.ok, `NOAA HTTP ${response.status}`);
  const body = await response.arrayBuffer();
  requireValue(body.byteLength > 0 && body.byteLength < 2_000_000, 'Unexpected upstream size');
  return new Uint8Array(body);
}
const decode = (bytes: Uint8Array) => new TextDecoder('windows-1252').decode(bytes);
const success = <T>(data: T, at: string): Feed<T> => ({ data, retrievedAt: at, checkedAt: at, error: null });

export async function refreshSnapshot(prior: Snapshot | null, fetcher: typeof fetch = fetch, now = new Date()): Promise<Snapshot> {
  const at = now.toISOString();
  async function refresh<T>(previous: Feed<T> | undefined, action: () => Promise<T>): Promise<Feed<T>> {
    try { return success(await action(), at); }
    catch (error) {
      console.error('NOAA refresh failed', error instanceof Error ? error.message : 'Unknown upstream failure');
      if (!previous) throw error;
      return { ...previous, checkedAt: at, error: 'Source check failed; showing the last validated data.' };
    }
  }
  const [discussion, weekly, roni, forecast] = await Promise.all([
    refresh(prior?.discussion, async () => {
      const data = parseDiscussion(decode(await fetchOfficial(urls.discussion, fetcher)), now);
      requireValue(!prior || data.issued >= prior.discussion.data.issued, 'Discussion moved backward');
      return data;
    }),
    refresh(prior?.weekly, async () => {
      const data = parseWeekly(decode(await fetchOfficial(urls.weekly, fetcher)), now);
      requireValue(!prior || data.at(-1)!.date >= prior.weekly.data.at(-1)!.date, 'Weekly series moved backward');
      return data;
    }),
    refresh(prior?.roni, async () => {
      const data = parseRoni(decode(await fetchOfficial(urls.roni, fetcher)), now);
      requireValue(!prior || data.at(-1)!.date >= prior.roni.data.at(-1)!.date, 'RONI moved backward');
      return data;
    }),
    refresh(prior?.forecast, async () => {
      const data = parseForecast(decode(await fetchOfficial(urls.forecast, fetcher)), urls.forecast, now);
      requireValue(!prior || data.issue >= prior.forecast.data.issue, 'Forecast moved backward');
      return data;
    }),
  ]);
  let previous = prior?.previous ?? null;
  if (prior?.forecast.data.issue && prior.forecast.data.issue < forecast.data.issue) previous = prior.forecast.data;
  if (!previous || previous.issue !== previousIssue(forecast.data.issue)) {
    try {
      const url = previousForecastUrl(forecast.data.issue);
      const archived = parseForecast(decode(await fetchOfficial(url, fetcher)), url, now);
      requireValue(archived.issue === previousIssue(forecast.data.issue), 'Archive issue was not the preceding month');
      previous = archived;
    } catch { previous = null; }
  }
  const map = await refresh(prior?.map, async () => {
    requireValue(!discussion.error, 'Discussion unavailable; retain matched map');
    const bytes = await fetchOfficial(urls.map, fetcher);
    requireValue(new TextDecoder().decode(bytes.slice(0, 6)).startsWith('GIF8'), 'Expected NOAA GIF image');
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    const version = [...new Uint8Array(hash)].map(n => n.toString(16).padStart(2, '0')).join('').slice(0, 20);
    return { version, base64: Buffer.from(bytes).toString('base64'), issued: discussion.data.issued };
  });
  return { schema: 1, discussion, weekly, roni, forecast, previous, map };
}

export function freshness(snapshot: Snapshot, now = new Date()) {
  const stale: string[] = [];
  const feeds = ['discussion', 'weekly', 'roni', 'forecast', 'map'] as const;
  for (const key of feeds) {
    const feed = snapshot[key];
    if (feed.error || now.getTime() - Date.parse(feed.retrievedAt) > 2 * day) stale.push(key);
  }
  if (now.getTime() - Date.parse(snapshot.weekly.data.at(-1)!.date) > 16 * day) stale.push('weekly observations');
  if (now.getTime() > Date.parse(snapshot.discussion.data.next) + 2 * day) stale.push('monthly discussion');
  if (now.getTime() - Date.parse(snapshot.roni.data.at(-1)!.date) > 50 * day) stale.push('seasonal RONI');
  if (now.getTime() - Date.parse(`${snapshot.forecast.data.issue}-01`) > 45 * day) stale.push('forecast issue');
  if (snapshot.map.data.issued !== snapshot.discussion.data.issued) stale.push('monthly map');
  return [...new Set(stale)];
}

export function formatDate(date: string, options: Intl.DateTimeFormatOptions = {}) {
  return new Date(date.length === 7 ? `${date}-01T00:00:00Z` : date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC', ...options });
}
export function seasonLabel(row: { season: string; year: number }) {
  return row.season === 'DJF' ? `DJF ${row.year - 1}-${String(row.year).slice(-2)}` : row.season === 'NDJ' ? `NDJ ${row.year}-${String(row.year + 1).slice(-2)}` : `${row.season} ${row.year}`;
}
export const signed = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(1)}`;

export async function persistSnapshot(store: KVStore, snapshot: Snapshot, prior: Snapshot | null) {
  await store.put(`map:${snapshot.map.data.version}`, JSON.stringify(snapshot.map.data));
  if (!prior || JSON.stringify(prior.forecast.data) !== JSON.stringify(snapshot.forecast.data)) {
    await store.put(`forecast:${snapshot.forecast.data.issue}:${snapshot.forecast.retrievedAt}`, JSON.stringify(snapshot.forecast.data));
  }
  await store.put('snapshot:v1', JSON.stringify(snapshot));
}

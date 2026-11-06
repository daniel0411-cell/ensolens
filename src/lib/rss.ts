import { formatDate, signed, type Snapshot } from './enso.ts';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function renderRss(snapshot: Snapshot, stale: string[]): string {
  const discussion = snapshot.discussion.data;
  const weekly = snapshot.weekly.data.at(-1)!;
  const forecast = snapshot.forecast.data;

  const channelNotice = stale.length
    ? ` Data status: degraded (${stale.join(', ')}). Showing last validated data; see https://ensolens.com/api/status/ for source health.`
    : '';
  const relatedStale = {
    discussion: ['discussion', 'monthly discussion'],
    forecast: ['forecast', 'forecast issue'],
    weekly: ['weekly', 'weekly observations'],
  };
  function sourceNotice(key: keyof typeof relatedStale): string {
    const feed = snapshot[key];
    if (!feed.error && !relatedStale[key].some(name => stale.includes(name))) return '';
    return ` Data status: ${feed.error ? 'source check failed' : 'source data may be out of date'}; showing last validated data. Last successful retrieval: ${feed.retrievedAt}. Last source check: ${feed.checkedAt}. See https://ensolens.com/api/status/.`;
  }

  const items: { title: string; link: string; guid: string; pubDate?: string; description: string }[] = [
    {
      title: `Official ENSO Diagnostic: ${discussion.alert} (${discussion.phase})`,
      link: 'https://ensolens.com/',
      guid: `https://ensolens.com/#discussion-${discussion.issued}`,
      pubDate: new Date(discussion.issued).toUTCString(),
      description: `${discussion.synopsis} Issued: ${discussion.issued}. Next scheduled release: ${discussion.next}.${sourceNotice('discussion')}`
    },
    {
      title: `CPC Seasonal Probabilities (Issue ${forecast.issue})`,
      link: 'https://ensolens.com/forecast/',
      guid: `https://ensolens.com/forecast/#issue-${forecast.issue}`,
      description: `Official NOAA CPC ENSO probabilities for issue ${forecast.issue}. Compares identical target seasons across consecutive releases.${sourceNotice('forecast')}`
    },
    {
      title: `Weekly Niño 3.4 SST Anomaly: ${signed(weekly.anomaly)}°C (Week centered ${formatDate(weekly.date)})`,
      link: 'https://ensolens.com/',
      guid: `https://ensolens.com/#weekly-${weekly.date}`,
      description: `Conventional weekly Niño 3.4 sea surface temperature anomaly of ${signed(weekly.anomaly)}°C centered on ${formatDate(weekly.date)}. This is the observation center week, not a publication date. Sourced from NOAA CPC OISST.${sourceNotice('weekly')}`
    },
    {
      title: 'When will El Niño peak and end? Three clocks, no single end date',
      link: 'https://ensolens.com/forecast/when-will-it-end/',
      guid: 'https://ensolens.com/forecast/when-will-it-end/',
      pubDate: new Date('2026-10-30T00:00:00Z').toUTCString(),
      description: 'Separate the ocean-temperature peak from the official phase return to neutral and regional impacts. Review spring barrier limits and subsurface heat depletion.'
    },
    {
      title: 'California: Does El Niño mean snow or rain? Sierra snowpack & atmospheric rivers',
      link: 'https://ensolens.com/impacts/california-snow-vs-rain/',
      guid: 'https://ensolens.com/impacts/california-snow-vs-rain/',
      pubDate: new Date('2026-10-30T00:00:00Z').toUTCString(),
      description: 'Why a wetter California winter need not mean a deeper Sierra snowpack. What Tahoe and Mammoth visitors need to know about atmospheric rivers and freezing levels.'
    }
  ];

  // RSS dates are optional; retrieval and request times are not publication dates.
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ENSOLens · Official ENSO Observations &amp; Forecast Changes</title>
    <link>https://ensolens.com/</link>
    <description>${escapeXml('Dated observations and probability changes for El Niño and La Niña from official NOAA CPC sources.' + channelNotice)}</description>
    <language>en-us</language>
    <atom:link href="https://ensolens.com/rss.xml" rel="self" type="application/rss+xml" />
    ${items.map(item => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="false">${escapeXml(item.guid)}</guid>
      ${item.pubDate ? `<pubDate>${escapeXml(item.pubDate)}</pubDate>` : ''}
      <description>${escapeXml(item.description)}</description>
    </item>`).join('')}
  </channel>
</rss>`;

}

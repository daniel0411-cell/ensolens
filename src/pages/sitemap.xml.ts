import type { APIRoute } from 'astro';
const paths = ['/', '/forecast/', '/forecast/when-will-it-end/', '/forecast/enso-neutral/', '/impacts/', '/impacts/california-snow-vs-rain/', '/impacts/pacific-northwest-winter/', '/historical/', '/faq/', '/winter-outlook/', '/hurricane-connection/', '/methodology/', '/about/', '/privacy/'];
// Meaningful page edits only; deploys and successful source checks do not advance these dates.
const modified: Record<string, string> = {
  '/': '2026-11-12',
  '/impacts/': '2026-11-12',
  '/impacts/pacific-northwest-winter/': '2026-11-12',
  '/forecast/enso-neutral/': '2026-11-12',
  '/forecast/': '2026-11-12',
  '/faq/': '2026-11-12',
  '/historical/': '2026-11-12',
  '/forecast/when-will-it-end/': '2026-11-12',
  '/impacts/california-snow-vs-rain/': '2026-11-12',
  '/winter-outlook/': '2026-11-12',
  '/about/': '2026-11-06',
  '/privacy/': '2026-11-06',
};
export const GET: APIRoute = () => new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + paths.map(path => '<url><loc>https://ensolens.com' + path + '</loc>' + (modified[path] ? '<lastmod>' + modified[path] + '</lastmod>' : '') + '</url>').join('') + '</urlset>', { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });

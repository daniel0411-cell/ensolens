import type { APIRoute } from 'astro';
const paths = ['/', '/forecast/', '/winter-outlook/', '/hurricane-connection/', '/methodology/', '/about/', '/privacy/'];
export const GET: APIRoute = () => new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + paths.map(path => '<url><loc>https://ensolens.com' + path + '</loc></url>').join('') + '</urlset>', { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });

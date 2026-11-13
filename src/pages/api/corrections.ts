import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { submitCorrection } from '../../lib/corrections';
export const POST: APIRoute = ({ request }) => submitCorrection(request, env.ENSO_CACHE);
export const GET: APIRoute = ({ request }) => submitCorrection(request, env.ENSO_CACHE);

# ENSOLens MVP

An English-language ENSO dashboard prototype built with Astro, Chart.js, and Lucide.

## Local development

```sh
npm install
npm run dev
```

```sh
npm run check
npm test
npm run build
```

## Deployment

The preview was deployed on October 20, 2026 (Asia/Shanghai):

- Primary URL: https://ensolens.com/
- www.ensolens.com redirects to the HTTPS primary host, preserving path and query.
- Cloudflare Worker: `ensolens`
- Fallback URL: https://ensolens.hurricanehub-canbao1.workers.dev/
- Version: `5757c27b-b2f4-4169-bda9-da8f28b76ab9`
- Registrar: Spaceship; authoritative DNS: Cloudflare.
- Nameservers: `brenda.ns.cloudflare.com`, `gerardo.ns.cloudflare.com`.
- Both hostnames are managed as Worker custom domains in `wrangler.toml`.

With Wrangler authenticated to the existing Cloudflare account:

```sh
npm run deploy
```

Validation: Astro check reported no errors or warnings; all three Worker tests passed; the static build succeeded. Chrome verified HTTPS on the primary domain, all five content pages, www and HTTP redirects preserving path/query, the custom not-found page, and the noindex meta tag. Desktop and 390px mobile checks covered navigation, map expansion, rendered charts, and the forecast comparison toggle; no horizontal overflow was observed on the mobile dashboard. Cloudflare showed active edge certificates and an activated domain. The terminal DNS resolver still returned ENOTFOUND during rollout, so live HTTP status/header checks from that resolver remain unverified.

## Data status

All dashboard values and map temperature colors are **illustrative**, not live observations or official forecasts. Example values are centralized in `src/data/demo.ts`. Map land outlines are Natural Earth public-domain data. No analytics or external font requests are included.

The deployed preview intentionally blocks indexing via robots.txt, a noindex meta tag, and an X-Robots-Tag response header. Before enabling indexing: connect and validate official sources, review regional copy, implement update monitoring and failure states, complete publisher/contact/privacy information, and review indexing controls and canonical URLs.

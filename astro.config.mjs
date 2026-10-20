import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://ensolens.com',
  output: 'server',
  adapter: cloudflare({ imageService: 'passthrough' }),
  session: false,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: { optimizeDeps: { include: ['chart.js'] } },
});

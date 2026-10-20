/// <reference types="@cloudflare/workers-types" />
/// <reference types="@astrojs/cloudflare/types.d.ts" />

interface Env {
  ENSO_CACHE: KVNamespace;
  ASSETS: Fetcher;
  INDEXING_ENABLED: string;
  CONTACT_ENABLED: string;
}

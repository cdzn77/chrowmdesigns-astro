// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Preserve the existing spacing between inline elements after the Astro 7 upgrade.
  compressHTML: true,
  site: 'https://chrowmdesigns.com',
  build: { inlineStylesheets: 'always' },
});

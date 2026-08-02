// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.circuitdiagramgenerator.ai',
  adapter: cloudflare({
    imageService: 'passthrough',
    sessionKVBindingName: 'SESSION',
    prerenderEnvironment: 'node',
  }),
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/keystatic') &&
        !page.includes('/api/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://www.circuitdiagramgenerator.ai/') {
          return { ...item, changefreq: 'weekly', priority: 1.0 };
        }
        if (item.url.includes('/pricing')) {
          return { ...item, changefreq: 'monthly', priority: 0.9 };
        }
        if (item.url.includes('/blog')) {
          return { ...item, changefreq: 'weekly', priority: 0.8 };
        }
        return item;
      },
    }),
    react(),
    markdoc(),
    keystatic(),
  ],
  build: {
    format: 'directory',
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Pages are still pre-built as static HTML. Only routes with `prerender = false`
  // (the enquiry form endpoints) run as Vercel serverless functions.
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});

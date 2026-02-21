// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const defaultSite = 'https://julienbohy.github.io';
const isCI = process.env.GITHUB_ACTIONS === 'true';
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserSiteRepository = repository.endsWith('.github.io');
const baseFromCi = isCI && repository && !isUserSiteRepository ? `/${repository}` : '/';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL ?? defaultSite,
  base: process.env.BASE_PATH ?? baseFromCi,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});

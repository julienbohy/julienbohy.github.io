import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';

export const prerender = true;

const staticPaths = ['/', '/portfolio', '/cv', '/blog', '/contact'];

export const GET: APIRoute = async ({ site }) => {
  const root = site ?? new URL(siteConfig.siteUrl);
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  const projects = await getCollection('projects');

  const urls = [
    ...staticPaths,
    ...posts.map((post) => `/blog/${post.slug}`),
    ...projects.map((project) => `/portfolio/${project.slug}`),
  ];

  const body = urls
    .map((path) => {
      const loc = new URL(path, root).toString();
      return `<url><loc>${loc}</loc></url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;

  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
};

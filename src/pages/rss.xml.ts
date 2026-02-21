import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/content';
import { siteConfig } from '../config/site';

export const prerender = true;

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const root = site ?? new URL(siteConfig.siteUrl);
  const posts = await getPublishedPosts();

  const items = posts
    .map((post) => {
      const url = new URL(`/blog/${post.slug}`, root).toString();
      return `\n<item>\n<title>${escapeXml(post.data.title)}</title>\n<link>${url}</link>\n<guid>${url}</guid>\n<pubDate>${new Date(post.data.date).toUTCString()}</pubDate>\n<description>${escapeXml(post.data.description)}</description>\n</item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n<title>Blog</title>\n<link>${root.toString()}</link>\n<description>Articles techniques</description>${items}\n</channel>\n</rss>`;

  return new Response(xml, {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
};

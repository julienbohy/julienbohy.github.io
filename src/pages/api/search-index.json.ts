import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../../lib/content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const payload = posts.map((post) => {
    const tags = Array.isArray(post.data.tags) ? post.data.tags.join(' ') : '';
    return {
      title: post.data.title,
      description: post.data.description,
      url: `/blog/${post.slug}`,
      search: `${post.data.title} ${post.data.description} ${tags}`.toLowerCase(),
    };
  });

  return new Response(JSON.stringify(payload), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};

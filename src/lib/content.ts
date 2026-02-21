import { getCollection } from 'astro:content';
import { extractSortedUnique, slugify, sortEntriesByDateDesc } from './content-utils.js';

export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  return sortEntriesByDateDesc(posts);
}

export async function getPublishedProjects() {
  const projects = await getCollection('projects');
  return sortEntriesByDateDesc(projects);
}

export function getTagBuckets(posts) {
  const tags = extractSortedUnique(posts, 'tags');
  return tags.map((name) => ({ name, slug: slugify(name) }));
}

export function getSeriesBuckets(posts) {
  const series = extractSortedUnique(posts, 'series');
  return series.map((name) => ({ name, slug: slugify(name) }));
}

export function matchTag(post, tagSlug) {
  const tags = Array.isArray(post.data.tags) ? post.data.tags : [];
  return tags.some((tag) => slugify(tag) === tagSlug);
}

export function matchSeries(post, seriesSlug) {
  const series = post.data.series;
  return series ? slugify(series) === seriesSlug : false;
}

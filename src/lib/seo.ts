export function buildCanonical(site, path) {
  if (!site) return undefined;
  return new URL(path, site).toString();
}

export function buildPersonSchema({ name, headline, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description: headline,
    url,
  };
}

export function buildBlogPostingSchema({ title, description, datePublished, dateModified, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url,
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

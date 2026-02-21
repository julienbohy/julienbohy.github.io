export function sortEntriesByDateDesc(entries) {
  return [...entries].sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
}

export function paginate(items, currentPage, pageSize) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: items.slice(start, end),
    totalItems: items.length,
    totalPages,
    pageSize,
    currentPage: safePage,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
    prevPage: safePage > 1 ? safePage - 1 : null,
    nextPage: safePage < totalPages ? safePage + 1 : null,
  };
}

export function extractSortedUnique(entries, field) {
  const values = new Set();

  for (const entry of entries) {
    const value = entry.data[field];
    if (Array.isArray(value)) {
      for (const item of value) {
        values.add(String(item).trim().toLowerCase());
      }
      continue;
    }

    if (value) {
      values.add(String(value).trim().toLowerCase());
    }
  }

  return Array.from(values).sort((a, b) => a.localeCompare(b, 'fr'));
}

export function filterByTerm(entries, term) {
  const query = term.trim().toLowerCase();
  if (!query) return entries;

  return entries.filter((entry) => {
    const title = String(entry.data.title ?? '').toLowerCase();
    const description = String(entry.data.description ?? '').toLowerCase();
    const tags = Array.isArray(entry.data.tags)
      ? entry.data.tags.map((tag) => String(tag).toLowerCase()).join(' ')
      : '';

    return title.includes(query) || description.includes(query) || tags.includes(query);
  });
}

export function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

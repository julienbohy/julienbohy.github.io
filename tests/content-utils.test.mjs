import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sortEntriesByDateDesc,
  paginate,
  extractSortedUnique,
  filterByTerm,
} from '../src/lib/content-utils.js';

const entries = [
  {
    id: 'a',
    data: {
      title: 'Astro Search',
      description: 'Guide recherche locale',
      date: new Date('2025-01-15'),
      tags: ['astro', 'search'],
      series: 'build',
    },
  },
  {
    id: 'b',
    data: {
      title: 'Portfolio rapide',
      description: 'Construire un portfolio',
      date: new Date('2024-12-10'),
      tags: ['portfolio'],
      series: 'build',
    },
  },
  {
    id: 'c',
    data: {
      title: 'CV efficace',
      description: 'Conseils cv',
      date: new Date('2025-02-01'),
      tags: ['cv'],
      series: 'career',
    },
  },
];

test('sortEntriesByDateDesc trie du plus récent au plus ancien', () => {
  const result = sortEntriesByDateDesc(entries).map((entry) => entry.id);
  assert.deepEqual(result, ['c', 'a', 'b']);
});

test('paginate retourne les métadonnées de pagination correctes', () => {
  const result = paginate(['a', 'b', 'c', 'd', 'e'], 2, 2);
  assert.deepEqual(result.items, ['c', 'd']);
  assert.equal(result.totalPages, 3);
  assert.equal(result.currentPage, 2);
  assert.equal(result.hasPrev, true);
  assert.equal(result.hasNext, true);
});

test('extractSortedUnique normalise et tri les valeurs uniques', () => {
  const result = extractSortedUnique(entries, 'tags');
  assert.deepEqual(result, ['astro', 'cv', 'portfolio', 'search']);
});

test('filterByTerm cherche dans titre, description et tags', () => {
  const result = filterByTerm(entries, 'search').map((entry) => entry.id);
  assert.deepEqual(result, ['a']);
});

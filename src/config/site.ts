export const siteConfig = {
  siteUrl: 'https://julienbohy.github.io',
  primaryContact: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bohyjulien/' },
  socials: [
    { label: 'GitHub', href: 'https://github.com/julienbohy' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bohyjulien/' },
  ],
  blogPageSize: 6,
  searchMaxResults: 8,
};

export function deriveSiteNameFromUrl(siteUrl: string) {
  try {
    const hostname = new URL(siteUrl).hostname.replace(/^www\./, '');
    const [root] = hostname.split('.');
    return root || 'portfolio';
  } catch {
    return 'portfolio';
  }
}

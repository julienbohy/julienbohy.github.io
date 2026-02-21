import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tech: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

const cv = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    location: z.string(),
    summary: z.string(),
    experiences: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        start: z.string(),
        end: z.string(),
        highlights: z.array(z.string()),
      })
    ),
    education: z.array(
      z.object({
        degree: z.string(),
        school: z.string(),
        year: z.string(),
      })
    ),
    skills: z.array(z.string()),
    languages: z.array(z.string()),
    certifications: z.array(z.string()),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.string().url(),
      })
    ),
  }),
});

export const collections = { blog, projects, cv };

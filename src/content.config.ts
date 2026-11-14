import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articleFields = {
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  date: z.iso.date(),
  draft: z.boolean().default(false),
};
const entryPath = z.string().regex(/^\/[a-zA-Z\d\p{Script=Han}-]+(?:\/[a-zA-Z\d\p{Script=Han}-]+)*\/$/u);
const httpsSource = z.url({ protocol: /^https$/ });
const datedIssue = {
  series: z.enum(['skills', 'weekly']),
  issue: z.iso.date(),
  period: z.object({ start: z.iso.date(), end: z.iso.date() }),
  sources: z.array(z.object({ title: z.string().trim().min(1), url: httpsSource })).min(1),
};

const entries = defineCollection({
  loader: glob({ base: './src/content/entries', pattern: '**/*.md' }),
  schema: z.discriminatedUnion('kind', [
    z.object({
      ...articleFields, kind: z.literal('article'), path: entryPath,
      series: z.literal('weekly').optional(),
      legacyAnchors: z.array(z.string().min(1)).optional(),
    }),
    z.object({ ...articleFields, kind: z.literal('note'), path: entryPath }),
    z.object({
      ...articleFields, kind: z.literal('training'), path: entryPath,
      activity: z.enum(['strength', 'running', 'cycling', 'hiking']),
    }),
    z.object({ ...articleFields, ...datedIssue, kind: z.literal('ai'), sample: z.boolean().default(false) }),
  ]),
});

export const collections = { entries };

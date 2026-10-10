import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        jurisdiction: z.string().optional(),
        lawCurrentTo: z.coerce.date().optional(),

        youtubeUrl: z.string().url().optional(),
        youtubeTitle: z.string().optional(),
        youtubeStart: z.number().int().nonnegative().optional(),

        diagrams: z.array(
          z.object({
            title: z.string(),
            src: z.string(),
            alt: z.string(),
            description: z.string().optional(),
          })
        ).default([]),
      }),
    }),
  }),
};
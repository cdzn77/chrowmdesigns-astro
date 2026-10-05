import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const chronicles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/chronicles' }),
  schema: z.object({
    title: z.string().min(10).max(110),
    description: z.string().min(40).max(180),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    coverageWeek: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    category: z.enum(['UX strategy', 'Product design', 'Visual craft', 'Design systems', 'Creative practice']),
    image: z.string().regex(/^\/images\/chronicles\/.+\.(png|webp|jpg)$/),
    imageAlt: z.string().min(15),
    imageConcept: z.string().min(30),
    author: z.literal('ChrowmDesigns').default('ChrowmDesigns'),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).min(1),
  }),
});
export const collections = { chronicles };

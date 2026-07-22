import { z } from 'zod';

export const ContentTypeEnum = z.enum(['movie', 'show', 'documentary', 'music']);

export const GetContentQuerySchema = z.object({
  type: ContentTypeEnum.optional(),
});

export const ContentParamsSchema = z.object({
  id: z.string().min(1, 'Content ID is required'),
});

export const CreateContentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: ContentTypeEnum,
  description: z.string().min(1, 'Description is required'),
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  duration: z.number().positive().optional(),
  releaseYear: z.number().int().min(1900).max(2100).optional(),
  genres: z.array(z.string()).optional(),
});

export const UpdateContentSchema = CreateContentSchema.partial();

import z from 'zod';

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Category name is required.'),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required.'),
});

export type CreateCategorySchemaType = z.infer<typeof createCategorySchema>;
export type CategorySchemaType = z.infer<typeof categorySchema>;

import z from 'zod';
import { categorySchema } from '../categories/categories.schema';

export const createBudgetSchema = z.object({
  amount: z.number().positive(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, 'Description is required'),
  categoryId: z.string().uuid(),
  accountId: z.string().uuid(),
});

export type CreateBudgetSchemaType = z.infer<typeof createBudgetSchema>;

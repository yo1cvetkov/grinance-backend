import z from 'zod';
import { categorySchema } from '../categories/categories.schema';

export const createBudgetSchema = z.object({
  amount: z.number().refine((value) => value % 1 !== 0, {
    message: 'Amount must be float.',
  }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, 'Description is required'),
  categoryId: z.string().uuid(),
  accountId: z.string().uuid(),
});

export type CreateBudgetSchemaType = z.infer<typeof createBudgetSchema>;

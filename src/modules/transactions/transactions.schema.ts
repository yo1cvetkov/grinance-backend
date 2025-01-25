import z from 'zod';
import validator from 'validator';
import { TransactionType } from './transaction-type.enum';

export const baseCreateTransactionSchema = z.object({
  amount: z.number(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, 'Description is required'),
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

export const createOneTimeTransactionSchema =
  baseCreateTransactionSchema.extend({
    type: z.enum([TransactionType.EXPENSE, TransactionType.INCOME]),
    transactionDate: z.string(),
  });

export type CreateOneTimeTransactionSchemaType = z.infer<
  typeof createOneTimeTransactionSchema
>;

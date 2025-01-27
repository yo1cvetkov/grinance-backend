import z from 'zod';

export const paginatedTransactionsSchema = z.object({
  page: z.string().transform(Number).optional().default('1'),
  limit: z.string().transform(Number).optional().default('10'),
  budgetId: z.string().uuid().optional(),
});

export type PaginatedTransactionsSchemaType = z.infer<
  typeof paginatedTransactionsSchema
>;

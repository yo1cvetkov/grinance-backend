import z from 'zod';

export const createAccountSchema = z.object({
  name: z
    .string({ required_error: 'Account name is required' })
    .min(1, 'Account name is required'),
});

export type CreateAccountSchemaType = z.infer<typeof createAccountSchema>;

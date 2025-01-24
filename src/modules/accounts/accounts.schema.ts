import z from 'zod';
import { Currency } from './currency.enum';

export const createAccountSchema = z.object({
  name: z
    .string({ required_error: 'Account name is required' })
    .min(1, 'Account name is required'),
});

export const updateAccountSchema = z.object({
  name: z
    .string({ required_error: 'Account name is required' })
    .min(1, 'Account name is required'),
  balance: z
    .number({ required_error: 'Balance is required.' })
    .refine((value) => value % 1 !== 0, {
      message: 'Balance must be float.',
    }),
  currency: z.enum([Currency.EUR, Currency.USD], {
    message: 'Currency must be either EUR or USD',
  }),
});

export type CreateAccountSchemaType = z.infer<typeof createAccountSchema>;
export type UpdateAccountSchemaType = z.infer<typeof updateAccountSchema>;

import { z } from 'zod';
import { Currency } from './currency.enum';

export const baseAccountResponseDTO = z.object({
  id: z.string(),
  name: z.string(),
  balance: z.string().transform(Number),
  currency: z.enum([Currency.EUR, Currency.USD]),
});

export const accountResponseDTO = baseAccountResponseDTO.extend({
  balance: z.string().transform(Number),
  currency: z.enum([Currency.EUR, Currency.USD]),
});

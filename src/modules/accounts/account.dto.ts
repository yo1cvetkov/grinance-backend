import { z } from 'zod';
import { Currency } from './currency.enum';

export const baseAccountResponseDTO = z.object({
  id: z.string(),
  name: z.string(),
});

export const accountResponseDTO = baseAccountResponseDTO.extend({
  balance: z.string(),
  currency: z.enum([Currency.EUR, Currency.USD]),
});

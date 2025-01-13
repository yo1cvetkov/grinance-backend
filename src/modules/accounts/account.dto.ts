import { z } from 'zod';

export const baseAccountResponseDTO = z.object({
  id: z.string(),
  name: z.string(),
});

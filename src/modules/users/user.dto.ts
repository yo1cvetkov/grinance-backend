import { z } from 'zod';

export const userResponseDTO = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  birthDate: z.date(),
  createdAt: z.date(),
  // TODO: Optionally add accounts array
});

export const fullUserDTO = userResponseDTO.extend({
  password: z.string(),
  // TODO: Or optionally add accounts array here
});

export type UserResponseType = z.infer<typeof userResponseDTO>;
export type UserType = z.infer<typeof fullUserDTO> & { id: string };

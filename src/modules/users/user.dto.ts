import { z } from 'zod';
import { baseAccountResponseDTO } from '../accounts/account.dto';

export const userResponseDTO = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  birthDate: z.string(),
});

export const fullUserDTO = userResponseDTO.extend({
  password: z.string(),
  passwordResetCode: z.string().nullable().optional(),
});

export const userResponseWithAccountsDTO = userResponseDTO.extend({
  accounts: z.array(baseAccountResponseDTO),
  activeAccount: baseAccountResponseDTO,
});

export type UserResponseType = z.infer<typeof userResponseDTO>;
export type UserType = z.infer<typeof fullUserDTO>;

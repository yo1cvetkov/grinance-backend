import { z } from 'zod';
import { baseAccountResponseDTO } from '../accounts/account.dto';

export const userResponseDTO = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
});

export const extendedUserDTO = userResponseDTO.extend({
  birthDate: z.string(),
  name: z.string(),
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
export type ExtendedUserResponseType = z.infer<typeof extendedUserDTO>;
export type UserType = z.infer<typeof fullUserDTO>;

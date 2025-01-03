import z from 'zod';
import validator from 'validator';
import { passwordValidationSchema } from 'src/common/common.schema';
import { baseCreateUser } from '../user/user.schema';

export const registerUserByEmailSchema = z
  .object({
    name: z.string({ required_error: 'Name is required.' }),
    confirmPassword: passwordValidationSchema('Confirm password'),
  })
  .merge(baseCreateUser)
  .strict()
  .refine(({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      return false;
    }

    return true;
  }, 'Password and confirm password must match.');

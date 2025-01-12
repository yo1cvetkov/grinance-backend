import z from 'zod';
import { passwordValidationSchema } from 'src/common/common.schema';
import { baseCreateUserSchema } from '../users/user.schema';

export const registerUserSchema = z
  .object({
    password: passwordValidationSchema('Password'),
    confirmPassword: passwordValidationSchema('Confirm password'),
  })
  .merge(baseCreateUserSchema)
  .strict()
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

export const loginUserSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(4, 'Username must be at least 4 characters long'),
  password: passwordValidationSchema('Password'),
});

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;
export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;

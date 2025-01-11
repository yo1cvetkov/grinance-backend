import * as z from 'zod';
import {
  isAdultSchema,
  isDateNotInFuture,
  passwordValidationSchema,
} from 'src/common/common.schema';

const birthDateValidation = isDateNotInFuture('Birth date').and(
  isAdultSchema('Birth date')
);

export const createUserSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Email is not valid.' }),
    password: passwordValidationSchema('Password'),
    confirmPassword: passwordValidationSchema('Confirm password'),
    username: z
      .string({ required_error: 'Username is required' })
      .min(4, 'Username must be at least 4 characters long'),
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters long.'),
    birthDate: birthDateValidation,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;

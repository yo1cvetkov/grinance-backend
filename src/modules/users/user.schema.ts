import * as z from 'zod';
import { isAdultSchema, isDateNotInFuture } from 'src/common/common.schema';

const birthDateValidation = isDateNotInFuture('Birth date').and(
  isAdultSchema('Birth date')
);

export const baseCreateUserSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email({ message: 'Email is not valid.' }),
  username: z
    .string({ required_error: 'Username is required' })
    .min(4, 'Username must be at least 4 characters long'),
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters long.'),
  birthDate: birthDateValidation,
});

export const updateUserSchema = z.object({
  name: z.string({ required_error: 'User Name is required' }),
  username: z
    .string({ required_error: 'Username is required' })
    .min(1, 'Username is required'),
  birthDate: birthDateValidation,
});

export type BaseCreateUserSchemaType = z.infer<typeof baseCreateUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

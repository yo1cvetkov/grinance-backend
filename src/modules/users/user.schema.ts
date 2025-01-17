import * as z from 'zod';
import { isAdultSchema, isDateNotInFuture } from 'src/common/common.schema';

const birthDateValidation = isDateNotInFuture('Birth date')
  .and(isAdultSchema('Birth date'))
  .optional();

export const baseCreateUserSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email({ message: 'Email is not valid.' }),
  username: z
    .string({ required_error: 'Username is required' })
    .min(4, 'Username must be at least 4 characters long'),
});

export const extendedCreateUserSchema = baseCreateUserSchema.extend({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters long.')
    .optional(),
  birthDate: birthDateValidation,
});

export type ExtendedCreateUserSchemaType = z.infer<
  typeof extendedCreateUserSchema
>;
export type BaseCreateUserSchemaType = z.infer<typeof baseCreateUserSchema>;

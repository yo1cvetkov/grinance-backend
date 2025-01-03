import validator from 'validator';
import { z } from 'zod';

export const successResponseSchema = z.object({
  success: z.boolean().default(true),
  message: z.string().optional(),
  data: z.record(z.string(), z.any()).optional(),
});

export const errorResponseSchema = z.object({
  message: z.string(),
  success: z.boolean().default(false),
  data: z.record(z.string(), z.any()),
  stack: z.string().optional(),
});

export const passwordValidationSchema = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is required` })
    .min(8)
    .max(64)
    .refine(
      (value) =>
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }),
      'Password is too weak',
    );

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

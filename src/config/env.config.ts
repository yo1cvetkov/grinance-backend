import dotenvx from '@dotenvx/dotenvx';
import { z } from 'zod';

dotenvx.config();

const envSchema = z.object({
  PORT: z.string().regex(/^\d+$/).transform(Number),
  CLIENT_SIDE_URL: z.string().url(),
  DB_HOST: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_PORT: z.string().regex(/^\d+$/).transform(Number),
  DB_USERNAME: z.string().min(1),
  DB_P: z.string().min(1),
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production'), z.literal('test')])
    .default('development')
    .optional(),
  APP_VERSION: z.string().optional().default('v1'),
  APP_NAME: z.string().optional().default('Grinance Backend'),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().regex(/^(\d+d|\d+h|\d+m|\d+s)$/),
  SESSION_EXPIRES_IN: z.string().min(1).transform(Number),
  SET_SESSION: z
    .string()
    .transform((value) => !!Number(value))
    .optional(),
  REDIS_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);

export default env;

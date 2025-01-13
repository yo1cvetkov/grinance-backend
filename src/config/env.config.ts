import { z } from 'zod';
import dotenv from '@dotenvx/dotenvx';

dotenv.config();

const envConfigSchema = z.object({
  PORT: z.string().regex(/^\d+$/).transform(Number),
  DB_PORT: z.string().regex(/^\d+$/).transform(Number),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  NODE_ENV: z
    .union([z.literal('production'), z.literal('development')])
    .default('development')
    .optional(),
  COOKIE_SESSION_SECRET_KEY: z.string(),
  ACCESS_TOKEN_EXPIRATION: z.string(),
  REFRESH_TOKEN_EXPIRATION: z.string(),
  STATIC_OTP: z
    .literal('0')
    .or(z.literal('1'))
    .transform((val) => Number(val)),
  OTP_TTL: z.string().transform(Number).optional(),
  REDIS_URL: z.string(),
});

export type EnvConfig = z.infer<typeof envConfigSchema>;

const env = envConfigSchema.parse(process.env);

export default env;

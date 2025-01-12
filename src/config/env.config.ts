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
});

export type EnvConfig = z.infer<typeof envConfigSchema>;

const env = envConfigSchema.parse(process.env);

export default env;

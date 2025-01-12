import { EnvConfig } from 'src/config/env.config';
import { JwtPayload } from 'src/modules/auth/auth.utils';

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload;
      session?: {
        accessToken?: string;
        refreshToken?: string;
      };
    }
  }

  namespace NodeJS {
    export interface ProcessEnv extends EnvConfig {}
  }
}

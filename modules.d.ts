import { Env } from 'src/config/env.config';
import { JwtPayload } from 'src/utils/auth.utils';

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload;
    }
  }

  namespace NodeJS {
    export interface ProcessEnv extends Env {}
  }
}

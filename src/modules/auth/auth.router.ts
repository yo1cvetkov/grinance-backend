import { Router } from 'express';
import { validateZodSchema } from 'src/middlewares/validate-zod-schema.middleware';
import { registerUserSchema } from './auth.schema';
import { handleRegisterUser } from './auth.controller';

export const AUTH_ROUTER_ROOT = '/auth';

const authRouter = Router();

authRouter.post(
  '/register',
  validateZodSchema(registerUserSchema),
  handleRegisterUser
);

export default authRouter;

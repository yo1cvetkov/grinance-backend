import { Router } from 'express';
import { validateZodSchema } from 'src/middlewares/validate-zod-schema.middleware';
import { loginUserSchema, registerUserSchema } from './auth.schema';
import {
  handleLoginUser,
  handleProtectedRoute,
  handleRegisterUser,
  handleTokenRefresh,
} from './auth.controller';
import { authenticate } from 'src/middlewares/authenticate.middleware';

export const AUTH_ROUTER_ROOT = '/auth';

const authRouter = Router();

authRouter.post(
  '/register',
  validateZodSchema(registerUserSchema),
  handleRegisterUser
);

authRouter.post('/login', validateZodSchema(loginUserSchema), handleLoginUser);

authRouter.get('/refresh', handleTokenRefresh);

authRouter.get('/protected', authenticate, handleProtectedRoute);

export default authRouter;

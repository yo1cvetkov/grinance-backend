import { Router } from 'express';
import { validateZodSchema } from 'src/middlewares/validate-zod-schema.middleware';
import {
  changePasswordSchema,
  forgetPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
} from './auth.schema';
import {
  handleChangePassword,
  handleForgetPassword,
  handleLoginUser,
  handleLogout,
  handleProtectedRoute,
  handleRegisterUser,
  handleResetPassword,
  handleTokenRefresh,
  handleWhoAmI,
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

authRouter.post(
  '/change-password',
  authenticate,
  validateZodSchema(changePasswordSchema),
  handleChangePassword
);

authRouter.post(
  '/forget-password',
  validateZodSchema(forgetPasswordSchema),
  handleForgetPassword
);

authRouter.post(
  '/reset-password',
  validateZodSchema(resetPasswordSchema),
  handleResetPassword
);

authRouter.post('/logout', authenticate, handleLogout);

authRouter.get('/whoAmI', authenticate, handleWhoAmI);

authRouter.get('/protected', authenticate, handleProtectedRoute);

export default authRouter;

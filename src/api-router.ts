import { Router } from 'express';
import usersRouter, { USERS_ROUTER_ROOT } from './modules/users/users.router';
import authRouter, { AUTH_ROUTER_ROOT } from './modules/auth/auth.router';

const apiRouter = Router();

apiRouter.use(USERS_ROUTER_ROOT, usersRouter);
apiRouter.use(AUTH_ROUTER_ROOT, authRouter);

export default apiRouter;

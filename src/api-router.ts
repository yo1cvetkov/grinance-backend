import { Router } from 'express';
import usersRouter, { USERS_ROUTER_ROOT } from './modules/users/users.router';
import authRouter, { AUTH_ROUTER_ROOT } from './modules/auth/auth.router';
import accountsRouter, {
  ACCOUNTS_ROUTER_ROOT,
} from './modules/accounts/accounts.router';

const apiRouter = Router();

apiRouter.use(USERS_ROUTER_ROOT, usersRouter);
apiRouter.use(AUTH_ROUTER_ROOT, authRouter);
apiRouter.use(ACCOUNTS_ROUTER_ROOT, accountsRouter);

export default apiRouter;

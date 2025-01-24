import { Router } from 'express';
import usersRouter, { USERS_ROUTER_ROOT } from './modules/users/users.router';
import authRouter, { AUTH_ROUTER_ROOT } from './modules/auth/auth.router';
import accountsRouter, {
  ACCOUNTS_ROUTER_ROOT,
} from './modules/accounts/accounts.router';
import budgetsRouter, {
  BUDGETS_ROUTER_ROOT,
} from './modules/budgets/budgets.router';
import categoriesRouter, {
  CATEGORIES_API_ROOT,
} from './modules/categories/categories.router';

const apiRouter = Router();

apiRouter.use(USERS_ROUTER_ROOT, usersRouter);
apiRouter.use(AUTH_ROUTER_ROOT, authRouter);
apiRouter.use(ACCOUNTS_ROUTER_ROOT, accountsRouter);
apiRouter.use(BUDGETS_ROUTER_ROOT, budgetsRouter);
apiRouter.use(CATEGORIES_API_ROOT, categoriesRouter);

export default apiRouter;

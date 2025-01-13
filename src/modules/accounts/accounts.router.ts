import { Router } from 'express';
import { authenticate } from 'src/middlewares/authenticate.middleware';
import { validateZodSchema } from 'src/middlewares/validate-zod-schema.middleware';
import { createAccountSchema } from './accounts.schema';
import { handleCreateAccount } from './accounts.controller';

export const ACCOUNTS_ROUTER_ROOT = '/accounts';

const accountsRouter = Router();

accountsRouter.post(
  '/',
  authenticate,
  validateZodSchema(createAccountSchema),
  handleCreateAccount
);

export default accountsRouter;

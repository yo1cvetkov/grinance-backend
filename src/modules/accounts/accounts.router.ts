import { Router } from 'express';
import { authenticate } from 'src/middlewares/authenticate.middleware';
import { validateZodSchema } from 'src/middlewares/validate-zod-schema.middleware';
import { createAccountSchema, updateAccountSchema } from './accounts.schema';
import {
  handleCreateAccount,
  handleGetAccount,
  handleUpdateAccount,
} from './accounts.controller';

export const ACCOUNTS_ROUTER_ROOT = '/accounts';

const accountsRouter = Router();

accountsRouter.post(
  '/',
  authenticate,
  validateZodSchema(createAccountSchema),
  handleCreateAccount
);

accountsRouter.get('/:id', authenticate, handleGetAccount);

accountsRouter.put(
  '/:id',
  authenticate,
  validateZodSchema(updateAccountSchema),
  handleUpdateAccount
);

export default accountsRouter;

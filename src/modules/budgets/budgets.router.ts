import { Router } from 'express';

import {
  handleCreateBudget,
  handleGetAccountBudgets,
} from './budgets.controller';
import { validateZodSchema } from 'src/middlewares/validate-zod-schema.middleware';
import { createBudgetSchema } from './budgets.schema';
import { authenticate } from 'src/middlewares/authenticate.middleware';

export const BUDGETS_ROUTER_ROOT = '/budgets';

const budgetsRouter = Router();

budgetsRouter.post(
  '/',
  authenticate,
  validateZodSchema(createBudgetSchema),
  handleCreateBudget
);

budgetsRouter.get('/:accountId', authenticate, handleGetAccountBudgets);

export default budgetsRouter;

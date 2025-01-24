import { Router } from 'express';
import { authenticate } from 'src/middlewares/authenticate.middleware';
import { validateZodSchema } from 'src/middlewares/validate-zod-schema.middleware';
import { createOneTimeTransactionSchema } from './transactions.schema';
import { handleCreateOneTimeTransaction } from './transaction.controller';

export const TRANSACTIONS_API_ROOT = '/transactions';

const transactionsRouter = Router();

transactionsRouter.post(
  '/one-time',
  authenticate,
  validateZodSchema(createOneTimeTransactionSchema),
  handleCreateOneTimeTransaction
);

export default transactionsRouter;

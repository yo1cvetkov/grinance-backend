import { Request, Response, NextFunction } from 'express';
import { CreateBudgetSchemaType } from './budgets.schema';
import { createBudget, getAccountBudgets } from './budgets.service';
import { StatusCodes } from 'http-status-codes';
import { BadRequestException } from 'src/lib/exceptions';

export const handleCreateBudget = async (
  req: Request<unknown, CreateBudgetSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const budget = await createBudget(req.user.sub, req.body);

    res.status(StatusCodes.OK).json(budget);
  } catch (error) {
    next(error);
  }
};

export const handleGetAccountBudgets = async (
  req: Request<{ accountId: string }, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    const accountId = req.params.accountId;

    if (!accountId) {
      throw new BadRequestException('Account id is missing.');
    }

    const budgets = await getAccountBudgets(req.user.sub, accountId);

    res.status(StatusCodes.OK).json(budgets);
  } catch (error) {
    next(error);
  }
};

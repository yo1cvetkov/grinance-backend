import { Request, Response, NextFunction } from 'express';
import { CreateBudgetSchemaType } from './budgets.schema';
import { createBudget } from './budgets.service';
import { StatusCodes } from 'http-status-codes';

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

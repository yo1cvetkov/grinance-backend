import { Request, Response, NextFunction } from 'express';
import { CreateOneTimeTransactionSchemaType } from './transactions.schema';
import { createOneTimeTransaction } from './transactions.service';
import { StatusCodes } from 'http-status-codes';

export const handleCreateOneTimeTransaction = async (
  req: Request<unknown, CreateOneTimeTransactionSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const transaction = await createOneTimeTransaction(req.user.sub, req.body);

    res.status(StatusCodes.OK).json(transaction);
  } catch (error) {
    next(error);
  }
};

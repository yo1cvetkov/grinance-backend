import { Request, Response, NextFunction } from 'express';
import { CreateOneTimeTransactionSchemaType } from './transactions.schema';
import {
  createOneTimeTransaction,
  getAllTransactions,
} from './transactions.service';
import { StatusCodes } from 'http-status-codes';
import {
  paginatedTransactionsSchema,
  PaginatedTransactionsSchemaType,
} from './transaction.dto';
import { BadRequestException } from 'src/lib/exceptions';

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

export const handleGetAllOneTimeTransactions = async (
  req: Request<
    { accountId: string },
    unknown,
    unknown,
    { page?: number; limit?: number; budgetId?: string }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.accountId) {
      throw new BadRequestException('Account id is required.');
    }

    await paginatedTransactionsSchema.parseAsync(req.query);

    const { transactions, limit, page, total, totalPages } =
      await getAllTransactions(
        req.user.sub,
        req.params.accountId,
        req.query as PaginatedTransactionsSchemaType
      );

    res.status(StatusCodes.OK).json({
      transactions,
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

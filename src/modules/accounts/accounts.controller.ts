import { NextFunction, Request, Response } from 'express';
import { CreateAccountSchemaType } from './accounts.schema';
import { createAccount } from './accounts.service';
import { StatusCodes } from 'http-status-codes';

export const handleCreateAccount = async (
  req: Request<unknown, unknown, CreateAccountSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    await createAccount(req.user.sub, req.body);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

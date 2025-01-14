import { NextFunction, Request, Response } from 'express';
import {
  CreateAccountSchemaType,
  UpdateAccountSchemaType,
} from './accounts.schema';
import {
  createAccount,
  getAccountById,
  updateAccount,
} from './accounts.service';
import { StatusCodes } from 'http-status-codes';
import { BadRequestException } from 'src/lib/exceptions';
import { accountResponseDTO } from './account.dto';

export const handleCreateAccount = async (
  req: Request<unknown, unknown, CreateAccountSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    await createAccount(req.user.sub, req.body);
    res.sendStatus(StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

export const handleGetAccount = async (
  req: Request<{ id: string }, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      throw new BadRequestException('Account id is required');
    }

    const account = await getAccountById(req.user.sub, req.params.id);

    res.status(StatusCodes.OK).json(accountResponseDTO.parse(account));
  } catch (error) {
    next(error);
  }
};

export const handleUpdateAccount = async (
  req: Request<{ id: string }, unknown, UpdateAccountSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      throw new BadRequestException('Account id is required');
    }

    const account = await updateAccount(req.user.sub, req.params.id, req.body);

    res.status(StatusCodes.OK).json(account);
  } catch (error) {
    next(error);
  }
};

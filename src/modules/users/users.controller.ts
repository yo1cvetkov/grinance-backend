import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  getUserById,
  setActiveAccount,
  updateUser,
} from './users.service';
import { StatusCodes } from 'http-status-codes';
import { BaseCreateUserSchemaType, UpdateUserSchemaType } from './user.schema';
import { userResponseDTO } from './user.dto';
import { generateRandomPassword } from '../auth/auth.utils';
import { BadRequestException } from 'src/lib/exceptions';
import { UpdateAccountSchemaType } from '../accounts/accounts.schema';

export const handleCreateUser = async (
  req: Request<unknown, unknown, BaseCreateUserSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdUser = await createUser({
      ...req.body,
      password: generateRandomPassword(),
    });
    res.status(StatusCodes.CREATED).json(userResponseDTO.parse(createdUser));
  } catch (error) {
    next(error);
  }
};

export const handleGetUserById = async (
  req: Request<{ id: string }, unknown>,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'User id must be provided.' });
    return;
  }

  try {
    const findUser = await getUserById(req.params.id);

    res.status(StatusCodes.OK).json(userResponseDTO.parse(findUser));
  } catch (error) {
    next(error);
  }
};

export const handleSetActiveAccount = async (
  req: Request<unknown, unknown, unknown, { accountId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.accountId) {
      throw new BadRequestException('accountId is required.');
    }

    await setActiveAccount(req.user.sub, req.query.accountId);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUser = async (
  req: Request<{ id: string }, UpdateUserSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      throw new BadRequestException('User id is missing');
    }

    const user = await updateUser(req.params.id, req.body);

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

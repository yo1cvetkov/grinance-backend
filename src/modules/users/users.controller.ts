import { Request, Response, NextFunction } from 'express';
import { createUser, getUserById } from './users.service';
import { StatusCodes } from 'http-status-codes';
import { BaseCreateUserSchemaType } from './user.schema';
import { userResponseDTO } from './user.dto';
import { generateRandomPassword } from '../auth/auth.utils';

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

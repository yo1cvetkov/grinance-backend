import { Request, Response, NextFunction } from 'express';
import { RegisterUserSchemaType } from './auth.schema';
import { registerUser } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import { userResponseDTO } from '../users/user.dto';

export const handleRegisterUser = async (
  req: Request<unknown, unknown, RegisterUserSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerUser(req.body);

    res.status(StatusCodes.CREATED).json(userResponseDTO.parse(user));
  } catch (error) {
    next(error);
  }
};

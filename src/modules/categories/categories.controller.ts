import { NextFunction, Request, Response } from 'express';
import { CreateCategorySchemaType } from './categories.schema';
import { createCategory } from './categories.service';
import { StatusCodes } from 'http-status-codes';

export const handleCreateCategory = async (
  req: Request<unknown, CreateCategorySchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await createCategory(req.body);

    res.status(StatusCodes.OK).json(category);
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode: number;
  message: string;
}

export const globalErrorHandler = (
  err: CustomError,
  _: Request,
  res: Response,
  __: NextFunction
): void => {
  const statusCode = err.statusCode || 500;

  const errorMessage = err.message || 'Internal Server Error';

  res.status(statusCode).json(errorMessage);
};

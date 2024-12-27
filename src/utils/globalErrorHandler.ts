import { RequestExtended, ResponseExtended } from 'src/types/zod-express';
import { NextFunction, Request, Response } from 'express';
import logger from 'src/lib/logger.service';
import { errorResponse } from './api.utils';
import env from 'src/config/env.config';

interface CustomError extends Error {
  status?: number;
  message: string;
}

export const globalErrorHandler = (
  err: CustomError,
  _: RequestExtended | Request,
  res: ResponseExtended | Response,
  __: NextFunction,
): void => {
  const statusCode = err.status || 500;

  const errorMessage = err.message || 'Internal server error';

  logger.error(`${statusCode}: ${errorMessage}`);

  return errorResponse(
    res as ResponseExtended,
    errorMessage,
    statusCode,
    err,
    env.NODE_ENV === 'development' && err.stack,
  );
};

export default globalErrorHandler;

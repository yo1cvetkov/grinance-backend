import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from 'src/lib/logger.service';
import { ResponseExtended } from 'src/types/zod-express';

export const errorResponse = (
  res: ResponseExtended | Response,
  message?: string,
  statusCode?: StatusCodes,
  payload?: any,
  stack?: any,
): void => {
  try {
    if ('jsonValidate' in res) {
      (res as ResponseExtended).status(statusCode ?? StatusCodes.BAD_REQUEST).jsonValidate({
        success: false,
        message,
        data: payload,
        stack,
      });
    } else {
      (res as ResponseExtended).status(statusCode ?? StatusCodes.BAD_REQUEST).json({
        success: false,
        message,
        data: payload,
        stack,
      });
    }

    return;
  } catch (error) {
    logger.error(error);
  }
};

export const successResponse = (
  res: ResponseExtended | Response,
  message?: string,
  payload?: Record<any, any>,
  statusCode: StatusCodes = StatusCodes.OK,
): void => {
  try {
    if ('jsonValidate' in res) {
      (res as ResponseExtended).status(statusCode).jsonValidate({ success: true, message, data: payload });
    } else {
      (res as ResponseExtended).status(statusCode).json({ success: true, message, data: payload });
    }

    return;
  } catch (error) {
    logger.error(error);
  }
};

import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestAny } from 'src/types/common';
import { RequestZodSchemaType } from 'src/types/zod-express';
import { errorResponse } from 'src/utils/api.utils';
import { sanitizeRecord } from 'src/utils/common.utils';
import { ZodError, ZodSchema } from 'zod';

export const validateZodSchema =
  (payload: RequestZodSchemaType) => (req: RequestAny, res: Response, next?: NextFunction) => {
    let error: ZodError | null = null;

    Object.entries(payload).forEach((prop) => {
      const [key, value] = prop as [keyof RequestZodSchemaType, ZodSchema];

      const parsed = value.safeParse(req[key]);

      if (!parsed.success) {
        if (error instanceof ZodError) {
          error.addIssues(parsed.error.issues);
        } else {
          error = parsed.error;
        }
      }

      req[key] = sanitizeRecord(parsed.data);
    });

    if (error) {
      return errorResponse(res, 'Invalid input', StatusCodes.BAD_REQUEST, error);
    } else {
      next?.();
    }
  };

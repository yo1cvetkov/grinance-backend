import { Request, Response, NextFunction } from 'express';
import {
  AnyZodObject,
  ZodEffects,
  ZodError,
  ZodIssue,
  ZodObject,
  ZodSchema,
} from 'zod';
import { StatusCodes } from 'http-status-codes';

export type ZodObjectWithEffect =
  | AnyZodObject
  | ZodEffects<ZodObjectWithEffect, unknown, unknown>;

// TODO: Revisit this and make type validation stronger

export const validateZodSchema =
  (schema: ZodSchema) =>
  (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: ZodIssue) => ({
          message: `${issue.path.join('.')}: ${issue.message}`,
        }));

        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Validation failed', details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
    }
  };

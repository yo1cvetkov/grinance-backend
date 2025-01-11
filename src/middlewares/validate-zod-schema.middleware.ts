import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodIssue, ZodObject } from 'zod';
import { StatusCodes } from 'http-status-codes';

// TODO: Revisit this and make type validation stronger

export const validateZodSchema =
  (schema: ZodObject<any, any>) =>
  (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: ZodIssue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));

        res
          .send(StatusCodes.BAD_REQUEST)
          .json({ error: 'Validation failed', details: errorMessages });
      } else {
        res
          .send(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
    }
  };

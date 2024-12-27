import { Request, Response } from 'express';
import { JwtPayload } from 'src/utils/auth.utils';
import { AnyZodObject, ZodEffects, ZodSchema } from 'zod';

export type ZodObjectWithEffect = AnyZodObject | ZodEffects<ZodObjectWithEffect, unknown, unknown>;

export type RequestZodSchemaType = {
  params?: ZodObjectWithEffect;
  query?: ZodObjectWithEffect;
  body?: ZodSchema;
};

export interface RequestExtended extends Request {
  user: JwtPayload;
}

export interface ResponseExtended extends Response {
  locals: {
    validateSchema?: ZodSchema;
  };
  jsonValidate: Response['json'];
  sendValidate: Response['send'];
}

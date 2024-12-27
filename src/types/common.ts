import { Request, Response } from 'express';
import { RequestZodSchemaType } from './zod-express';
import { ZodTypeAny } from 'zod';

export type IDontKnow = unknown | never | any;

export type MaybePromise = void | Promise<void>;

export type RequestAny = Request<IDontKnow, IDontKnow, IDontKnow, IDontKnow>;

export type ResponseAny = Response<IDontKnow, Record<string, any>>;

export type RequestAndResponseType = {
  requestType?: RequestZodSchemaType;
  responseModel?: ZodTypeAny;
};

import { NextFunction } from 'express';
import { ZodError } from 'zod';
import { RequestExtended, ResponseExtended } from 'src/types/zod-express';

const responseInterceptor = (_: RequestExtended, res: ResponseExtended, next: NextFunction) => {
  const originalJson = res.json;
  const originalSend = res.send;

  const validateSchema = res.locals.validateSchema ?? null;

  res.jsonValidate = function (body) {
    if (validateSchema) {
      try {
        validateSchema.parse(body);
      } catch (error) {
        if (error instanceof ZodError) {
          return originalJson.call(this, {
            success: false,
            message: 'Response Validation Error - Server error',
            data: error.errors,
            stack: error.stack,
          });
        }
      }
    }

    return originalJson.call(this, validateSchema ? validateSchema.parse(body) : body);
  };

  res.sendValidate = function (body) {
    if (validateSchema) {
      try {
        validateSchema.parse(body);
      } catch (error) {
        if (error instanceof ZodError) {
          return originalJson.call(this, {
            success: false,
            message: 'Response validation error - Server error',
            data: error.errors,
            stack: error.stack,
          });
        }
      }
    }

    return originalSend.call(this, validateSchema ? validateSchema.parse(body) : body);
  };

  next();
};

export default responseInterceptor;

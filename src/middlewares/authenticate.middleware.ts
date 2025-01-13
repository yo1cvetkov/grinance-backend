import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import env from 'src/config/env.config';
import { JwtPayload, verifyToken } from 'src/modules/auth/auth.utils';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session || !req.session.accessToken) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized. Please log in.' });

      return;
    }

    const token = req.session?.accessToken;

    const decode = await verifyToken<JwtPayload>(
      token,
      env.ACCESS_TOKEN_SECRET
    );

    req.user = decode;

    next();
  } catch (error) {
    next(error);
  }
};

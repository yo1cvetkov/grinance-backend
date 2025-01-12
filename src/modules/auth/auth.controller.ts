import { Request, Response, NextFunction } from 'express';
import { LoginUserSchemaType, RegisterUserSchemaType } from './auth.schema';
import { loginUser, registerUser } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import { userResponseDTO } from '../users/user.dto';
import { generateAccessToken, JwtPayload, verifyToken } from './auth.utils';
import env from 'src/config/env.config';

export const handleRegisterUser = async (
  req: Request<unknown, unknown, RegisterUserSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerUser(req.body);

    res.status(StatusCodes.CREATED).json(userResponseDTO.parse(user));
  } catch (error) {
    next(error);
  }
};

export const handleLoginUser = async (
  req: Request<unknown, unknown, LoginUserSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const [accessToken, refreshToken] = await loginUser(req.body);

    if (!req.session) {
      res.status(500).json({ error: 'Session is not initialized.' });
      return;
    }

    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export const handleTokenRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session || !req.session.refreshToken) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized. No refresh token provided.' });
      return;
    }

    const refreshToken = req.session.refreshToken;

    const decoded = await verifyToken(refreshToken, env.REFRESH_TOKEN_SECRET);

    const newJwtPayload: JwtPayload = {
      sub: decoded.sub,
      email: decoded.email,
      username: decoded.username,
    };

    const newAccessToken = generateAccessToken(newJwtPayload);

    req.session.accessToken = newAccessToken;

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

// TODO: Remove this because it is just a example of protected route
export const handleProtectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(StatusCodes.OK).json({ message: 'Protected data is available' });
  } catch (error) {
    next(error);
  }
};

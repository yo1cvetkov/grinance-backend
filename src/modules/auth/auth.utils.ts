import bcrypt from 'bcrypt';

import crypto from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import env from 'src/config/env.config';
import { ForbiddenException, UnauthorizedException } from 'src/lib/exceptions';

export type JwtPayload = {
  sub: string;
  email: string;
  username: string;
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, 10);
};

export const generateRandomPassword = (length: number = 16): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const compareHash = async (
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const verifyToken = async <T extends JwtPayload>(
  token: string,
  secret: string
): Promise<T> => {
  try {
    return verify(token, secret) as T;
  } catch (error) {
    throw new ForbiddenException('Token expired or not valid');
  }
};

export const generateOTP = (): [string, number] => {
  let otp = '';
  let ttl: number;

  if (Boolean(Number(env.STATIC_OTP))) {
    otp = '1234';
    ttl = 300;
  } else {
    otp = crypto.randomInt(1000, 10000).toString();
    ttl = Number(env.OTP_TTL) || 300;
  }

  return [otp, ttl];
};

export const generateAccessToken = (jwtPayload: JwtPayload) =>
  sign(jwtPayload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: String(env.ACCESS_TOKEN_EXPIRATION),
  });

export const generateRefreshToken = (jwtPayload: JwtPayload) =>
  sign(jwtPayload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: String(env.REFRESH_TOKEN_EXPIRATION),
  });

import bcrypt from 'bcrypt';

import crypto from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import env from 'src/config/env.config';
import { ForbiddenException, UnauthorizedException } from 'src/lib/exceptions';

export type JwtPayload = {
  sub: string;
  email: string;
  username: string;
  // Optionally add additional fields
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
    console.log('Verifying token...');

    return verify(token, secret) as T;
  } catch (error) {
    throw new ForbiddenException('Token expired or not valid');
  }
};

export const generateAccessToken = (jwtPayload: JwtPayload) =>
  sign(jwtPayload, env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

export const generateRefreshToken = (jwtPayload: JwtPayload) =>
  sign(jwtPayload, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

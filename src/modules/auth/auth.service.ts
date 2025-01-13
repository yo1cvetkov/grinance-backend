import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from 'src/lib/exceptions';
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
} from '../users/users.service';
import {
  ChangePasswordSchemaType,
  ForgetPasswordSchemaType,
  LoginUserSchemaType,
  RegisterUserSchemaType,
  ResetPasswordSchemaType,
} from './auth.schema';
import { UserResponseType } from '../users/user.dto';
import { UsersRepository } from '../users/users.respository';
import {
  compareHash,
  generateAccessToken,
  generateOTP,
  generateRefreshToken,
  hashPassword,
  JwtPayload,
} from './auth.utils';
import { redisClient } from 'src/lib/redis-client';

export const registerUser = async (
  payload: RegisterUserSchemaType
): Promise<UserResponseType> => {
  const userExistsByEmail = await UsersRepository.findOneBy({
    email: payload.email,
  });

  if (userExistsByEmail) {
    throw new ConflictException('User with entered email already exists.');
  }

  const userExistsByUsername = await UsersRepository.findOneBy({
    username: payload.username,
  });

  if (userExistsByUsername) {
    throw new ConflictException('User with entered username already exists.');
  }

  const { confirmPassword, ...rest } = payload;

  const user = await createUser(rest);

  return user;
};

export const loginUser = async (
  payload: LoginUserSchemaType
): Promise<string[]> => {
  const user = await getUserByUsername(payload.username);

  if (!(await compareHash(String(user.password), payload.password))) {
    throw new BadRequestException('Invalid password');
  }

  const jwtPayload: JwtPayload = {
    sub: String(user.id),
    email: user.email,
    username: user.username,
  };

  const accessToken = generateAccessToken(jwtPayload);
  const refreshToken = generateRefreshToken(jwtPayload);

  return [accessToken, refreshToken];
};

export const changePassword = async (
  userId: string,
  payload: ChangePasswordSchemaType
): Promise<void> => {
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundException('User not found.');
  }

  const isCurrentPasswordCorrect = await compareHash(
    user.password,
    payload.currentPassword
  );

  if (!isCurrentPasswordCorrect) {
    throw new BadRequestException('Current password is not correct.');
  }

  const hashedPassword = await hashPassword(payload.newPassword);

  await updateUser(userId, { password: hashedPassword });
};

export const forgetPassword = async (
  payload: ForgetPasswordSchemaType
): Promise<string> => {
  const user = await getUserByEmail(payload.email);

  if (!user) {
    throw new NotFoundException('User with a given email doesnt exist.');
  }

  const [otp, ttl]: [string, number] = generateOTP();

  await redisClient.set(`otp:${user.id}`, otp, {
    EX: ttl,
  });

  return user.email;
};

export const resetPassword = async (
  payload: ResetPasswordSchemaType
): Promise<void> => {
  const user = await getUserByEmail(payload.email);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const storedOtp = await redisClient.get(`otp:${user.id}`);

  if (!storedOtp || storedOtp !== payload.code) {
    throw new BadRequestException('Invalid or expired OTP');
  }

  const hashedPassword = await hashPassword(payload.password);

  await updateUser(user.id, {
    password: hashedPassword,
  });

  await redisClient.del(`otp:${user.id}`);
};

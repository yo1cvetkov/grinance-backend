import { BadRequestException, ConflictException } from 'src/lib/exceptions';
import { User } from '../users/user.entity';
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from '../users/users.service';
import { LoginUserSchemaType, RegisterUserSchemaType } from './auth.schema';
import { UserResponseType } from '../users/user.dto';
import { UsersRepository } from '../users/users.respository';
import {
  compareHash,
  generateAccessToken,
  generateRefreshToken,
  JwtPayload,
} from './auth.utils';

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

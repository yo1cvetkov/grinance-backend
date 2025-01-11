import { hashPassword } from '../auth/auth.utils';
import { UserResponseType, UserType } from './user.dto';
import { User } from './user.entity';
import { CreateUserSchemaType } from './user.schema';
import { UsersRepository } from './users.respository';

// TODO: Revisit once you figure out if this needs accounts relation
export const getUserById = async (id: string): Promise<User> => {
  const user = await UsersRepository.findOneBy({ id });

  if (!user) {
    throw new Error('User not found.');
  }

  return user;
};

export const createUser = async (
  payload: CreateUserSchemaType
): Promise<UserResponseType> => {
  const isExistingUsername = await UsersRepository.findOneBy({
    username: payload.username,
  });

  if (isExistingUsername) {
    throw new Error('User with a given username already exists.');
  }

  const isExistingEmail = await UsersRepository.findOneBy({
    email: payload.email,
  });

  if (isExistingEmail) {
    throw new Error('User with a given email already exists.');
  }

  const hashedPassword = await hashPassword(payload.password);

  const { password, accounts, ...createdUser } = await UsersRepository.save({
    email: payload.email,
    birthDate: payload.birthDate,
    name: payload.name,
    password: hashedPassword,
    username: payload.username,
  });

  return createdUser;
};

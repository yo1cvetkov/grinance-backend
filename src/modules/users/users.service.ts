import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from 'src/lib/exceptions';
import { hashPassword } from '../auth/auth.utils';
import { UserResponseType, UserType } from './user.dto';
import { User } from './user.entity';
import { BaseCreateUserSchemaType } from './user.schema';
import { UsersRepository } from './users.respository';
import { Account } from '../accounts/account.entity';

export const getUserById = async (id: string): Promise<User> => {
  const user = await UsersRepository.findOne({
    where: { id },
    relations: {
      accounts: true,
      activeAccount: true,
    },
  });

  if (!user) {
    throw new NotFoundException('User not found.');
  }

  return user;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const findUser = await UsersRepository.findOneBy({ email });

  if (!findUser) {
    throw new NotFoundException('User with a given email not found.');
  }

  return findUser;
};

export const getUserByUsername = async (username: string): Promise<User> => {
  const findUser = await UsersRepository.findOneBy({ username });

  if (!findUser) {
    throw new NotFoundException('User with a given username not found.');
  }

  return findUser;
};

export const createUser = async (
  payload: BaseCreateUserSchemaType & { password: string }
): Promise<UserResponseType> => {
  const isExistingUsername = await UsersRepository.findOneBy({
    username: payload.username,
  });

  if (isExistingUsername) {
    throw new ConflictException('User with a given username already exists.');
  }

  const isExistingEmail = await UsersRepository.findOneBy({
    email: payload.email,
  });

  if (isExistingEmail) {
    throw new ConflictException('User with a given email already exists.');
  }

  const hashedPassword = await hashPassword(payload.password);

  const { password, accounts, ...createdUser } = await UsersRepository.save({
    email: payload.email,
    password: hashedPassword,
    username: payload.username,
    birthDate: payload.birthDate,
    name: payload.name,
  });

  return createdUser;
};

export const updateUser = async (
  userId: string,
  payload: Partial<UserType>
): Promise<User> => {
  const findUser = await UsersRepository.findOneBy({ id: userId });

  if (!findUser) {
    throw new NotFoundException('User not found.');
  }

  Object.assign(findUser, payload);

  const user = await UsersRepository.save(findUser);

  return user;
};

export const setActiveAccount = async (userId: string, accountId: string) => {
  const user = await getUserById(userId);

  const account = user.accounts.find((acc) => acc.id === accountId);

  if (!account) {
    throw new BadRequestException('Invalid account for this user.');
  }

  user.activeAccount = account;

  await UsersRepository.save(user);
};

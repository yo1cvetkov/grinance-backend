import { BadRequestException, NotFoundException } from 'src/lib/exceptions';
import { getUserById } from '../users/users.service';
import { AccountsRepository } from './accounts.repository';
import {
  CreateAccountSchemaType,
  UpdateAccountSchemaType,
} from './accounts.schema';
import { Account } from './account.entity';

export const MAX_ACCOUNTS_PER_USER = 5;

export const createAccount = async (
  userId: string,
  payload: CreateAccountSchemaType
): Promise<void> => {
  const user = await getUserById(userId);

  if (user.accounts.length >= MAX_ACCOUNTS_PER_USER) {
    throw new BadRequestException('Account limit reached.');
  }

  await AccountsRepository.save({
    name: payload.name,
    user,
  });
};

export const getAccountById = async (userId: string, accountId: string) => {
  const account = await AccountsRepository.findOne({
    where: { id: accountId },
    relations: {
      user: true,
    },
  });

  if (!account) {
    throw new NotFoundException('Account not found.');
  }

  if (account.user.id !== userId) {
    throw new BadRequestException(
      'Account doesn belong to the currently logged in user.'
    );
  }

  return account;
};

export const updateAccount = async (
  userId: string,
  accountId: string,
  payload: UpdateAccountSchemaType
): Promise<Account> => {
  const account = await getAccountById(userId, accountId);

  Object.assign(account, payload);

  const updatedAccount = await AccountsRepository.save(account);

  return updatedAccount;
};

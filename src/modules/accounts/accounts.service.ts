import { BadRequestException } from 'src/lib/exceptions';
import { getUserById } from '../users/users.service';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountSchemaType } from './accounts.schema';

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

import { BadRequestException, NotFoundException } from 'src/lib/exceptions';
import { CategoriesRepository } from '../categories/categories.repository';
import { CreateBudgetSchemaType } from './budgets.schema';
import { getUserById } from '../users/users.service';
import { BudgetsRepository } from './budgets.repository';
import { AccountsRepository } from '../accounts/accounts.repository';
import { updateAccount } from '../accounts/accounts.service';

export const createBudget = async (
  userId: string,
  payload: CreateBudgetSchemaType
) => {
  const category = await CategoriesRepository.findOneBy({
    id: payload.categoryId,
  });

  if (!category) {
    throw new NotFoundException('Category not found.');
  }

  const user = await getUserById(userId);

  if (user.activeAccount.id !== payload.accountId) {
    throw new BadRequestException(
      'Account doesnt belong to the currently logged in user.'
    );
  }

  const account = await AccountsRepository.findOneBy({ id: payload.accountId });

  if (!account) {
    throw new NotFoundException('Account not found');
  }

  if (account.balance < payload.amount) {
    throw new BadRequestException('Insufficient funds.');
  }

  const budget = await BudgetsRepository.save({
    category: category,
    amount: payload.amount,
    account: account,
    description: payload.description,
  });

  await updateAccount(userId, payload.accountId, {
    balance: account.balance - payload.amount,
    currency: account.currency,
    name: account.name,
  });

  return budget;
};

export const getAccountBudgets = async (userId: string, accountId: string) => {
  const user = await getUserById(userId);

  if (user.activeAccount.id !== accountId) {
    throw new BadRequestException(
      "Account doesn't belong to the specific user or not active."
    );
  }

  const account = await AccountsRepository.findOne({
    where: {
      id: accountId,
    },
    relations: {
      budgets: {
        category: true,
        account: true,
      },
    },
  });

  if (!account) {
    throw new NotFoundException('Account not found.');
  }

  return account.budgets;
};

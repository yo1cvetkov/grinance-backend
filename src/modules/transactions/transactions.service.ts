import { BadRequestException, NotFoundException } from 'src/lib/exceptions';
import { getUserById } from '../users/users.service';
import { CreateOneTimeTransactionSchemaType } from './transactions.schema';
import { AccountsRepository } from '../accounts/accounts.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { OneTimeTransactionRepository } from './transactions.repository';
import { BudgetsRepository } from '../budgets/budgets.repository';
import { TransactionType } from './transaction-type.enum';
import { PaginatedTransactionsSchemaType } from './transaction.dto';
import { getAccountById } from '../accounts/accounts.service';

export const createOneTimeTransaction = async (
  userId: string,
  payload: CreateOneTimeTransactionSchemaType
) => {
  const user = await getUserById(userId);

  if (user.activeAccount.id !== payload.accountId) {
    throw new BadRequestException(
      "Account is not active or doesn't belong to the current user"
    );
  }

  const account = await AccountsRepository.findOneBy({ id: payload.accountId });

  if (!account) {
    throw new NotFoundException('Account not found');
  }

  const category = await CategoriesRepository.findOneBy({
    id: payload.categoryId,
  });

  if (!category) {
    throw new NotFoundException('Category not found');
  }

  const budget = await BudgetsRepository.findOne({
    where: {
      category: { id: category.id },
      account: { id: account.id },
    },
  });

  if (!budget) {
    throw new NotFoundException(
      'Budget for this account and category not found.'
    );
  }

  if (budget.amount < payload.amount || account.balance < payload.amount) {
    throw new BadRequestException('Insufficient funds.');
  }

  const transaction = await OneTimeTransactionRepository.save({
    amount: payload.amount,
    type: payload.type,
    account: account,
    category: category,
    description: payload.description,
    transactionDate: payload.transactionDate,
  });

  if (transaction.type === TransactionType.EXPENSE) {
    Object.assign(budget, { amount: budget.amount - transaction.amount });
    Object.assign(account, { balance: account.balance - transaction.amount });
  }

  if (transaction.type === TransactionType.INCOME) {
    Object.assign(budget, { amount: budget.amount + transaction.amount });
    Object.assign(account, { balance: account.balance + transaction.amount });
  }

  await BudgetsRepository.save(budget);
  await AccountsRepository.save(account);

  return transaction;
};

export const getAllTransactions = async (
  userId: string,
  accountId: string,
  { page = 1, limit = 10, budgetId }: PaginatedTransactionsSchemaType
) => {
  const account = await getAccountById(userId, accountId);

  const skip = (page - 1) * limit;

  if (!budgetId) {
    const [transactions, total] =
      await OneTimeTransactionRepository.findAndCount({
        where: {
          account: {
            id: account.id,
          },
        },
        take: limit,
        skip: skip,
        order: { createdAt: 'desc' },
        relations: {
          category: true,
        },
      });

    return {
      transactions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  const budget = await BudgetsRepository.findOne({
    where: {
      id: budgetId,
    },
    relations: {
      category: true,
    },
  });

  if (!budget) {
    throw new NotFoundException('Budget not found');
  }

  const [transactions, total] = await OneTimeTransactionRepository.findAndCount(
    {
      where: {
        account: {
          id: account.id,
        },
        category: {
          id: budget.category.id,
        },
      },
      take: limit,
      skip: skip,
      order: { createdAt: 'desc' },
    }
  );

  return {
    transactions,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

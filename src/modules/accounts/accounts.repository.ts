import { AppDataSource } from 'src/lib/data-source';
import { Account } from './account.entity';

export const AccountsRepository = AppDataSource.getRepository(Account);

import { AppDataSource } from "src/lib/data-source";
import { OneTimeTransaction, RecurringTransaction } from "./transaction.entity";

export const OneTimeTransactionRepository = AppDataSource.getRepository(OneTimeTransaction);
export const RecurringTransactionRepository = AppDataSource.getRepository(RecurringTransaction);

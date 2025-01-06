import { DataSource } from "typeorm";
import env from "../config/env.config";
import { Account } from "src/modules/accounts/account.entity";
import { AIInsight } from "src/modules/ai-insights/ai-insight.entity";
import { Budget } from "src/modules/budgets/budget.entity";
import { Category } from "src/modules/categories/category.entity";
import { OneTimeTransaction, RecurringTransaction } from "src/modules/transactions/transaction.entity";
import { User } from "src/modules/users/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Account, AIInsight, Budget, Category, OneTimeTransaction, RecurringTransaction, User],
});

export async function connectToDb() {
  try {
    console.log("Connecting to the database...");
    await AppDataSource.initialize();
    console.log("Connected to database.");
  } catch (error) {
    console.log((error as Error).message);
    process.exit(1);
  }
}

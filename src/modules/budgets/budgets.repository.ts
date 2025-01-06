import { AppDataSource } from "src/lib/data-source";
import { Budget } from "./budget.entity";

export const BudgetsRepository = AppDataSource.getRepository(Budget);

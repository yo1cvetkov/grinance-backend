import { AppDataSource } from "src/lib/data-source";
import { Category } from "./category.entity";

export const CategoriesRepository = AppDataSource.getRepository(Category);

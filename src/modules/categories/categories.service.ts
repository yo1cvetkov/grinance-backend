import { CategoriesRepository } from './categories.repository';
import { CreateCategorySchemaType } from './categories.schema';

export const createCategory = async (payload: CreateCategorySchemaType) => {
  const category = await CategoriesRepository.save({
    name: payload.name,
  });

  return category;
};

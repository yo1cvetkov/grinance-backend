import { Router } from 'express';
import { handleCreateCategory } from './categories.controller';
import { validateZodSchema } from 'src/middlewares/validate-zod-schema.middleware';
import { createCategorySchema } from './categories.schema';
import { authenticate } from 'src/middlewares/authenticate.middleware';

export const CATEGORIES_API_ROOT = '/categories';

const categoriesRouter = Router();

categoriesRouter.post(
  '/',
  authenticate,
  validateZodSchema(createCategorySchema),
  handleCreateCategory
);

export default categoriesRouter;
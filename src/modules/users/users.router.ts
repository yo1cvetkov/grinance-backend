import { Router } from 'express';
import { handleCreateUser, handleGetUserById } from './users.controller';
import { validateZodSchema } from 'src/middlewares/validate-zod-schema.middleware';
import { baseCreateUserSchema } from './user.schema';

export const USERS_ROUTER_ROOT = '/users';

const usersRouter = Router();

usersRouter.get('/:id', handleGetUserById);
usersRouter.post(
  '/',
  validateZodSchema(baseCreateUserSchema),
  handleCreateUser
);

export default usersRouter;

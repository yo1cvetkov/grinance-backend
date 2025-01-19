import { Router } from 'express';
import {
  handleCreateUser,
  handleGetUserById,
  handleSetActiveAccount,
  // handleUpdateUser,
} from './users.controller';
import { validateZodSchema } from 'src/middlewares/validate-zod-schema.middleware';
import { baseCreateUserSchema } from './user.schema';
import { authenticate } from 'src/middlewares/authenticate.middleware';

export const USERS_ROUTER_ROOT = '/users';

const usersRouter = Router();

usersRouter.get('/:id', handleGetUserById);
// usersRouter.put('/:id', handleUpdateUser);
usersRouter.post(
  '/',
  validateZodSchema(baseCreateUserSchema),
  handleCreateUser
);

usersRouter.patch('/active-account', authenticate, handleSetActiveAccount);

export default usersRouter;

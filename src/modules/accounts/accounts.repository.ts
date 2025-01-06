import { AppDataSource } from "src/lib/data-source";
import { User } from "../users/user.entity";

export const UsersRepository = AppDataSource.getRepository(User);

import { AppDataSource } from "src/lib/data-source";
import { User } from "./user.entity";

export const UsersRepository = AppDataSource.getRepository(User);

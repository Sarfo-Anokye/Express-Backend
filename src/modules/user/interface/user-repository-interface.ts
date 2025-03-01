import {user} from "@prisma/client";
import {CreateUserDTO} from "../user-dto";

export interface IUserRepository {
  //   getAllUsers(): Promise<user[]>;
  //   getUserById(id: string): Promise<user>;
  createUser(data: CreateUserDTO): Promise<user>;
}

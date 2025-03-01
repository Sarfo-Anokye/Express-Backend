import {user} from "@prisma/client";
import {CreateUserDTO, UpdateUserDTO} from "../user-dto";
import {ListAllUsersResponeType} from "./user-type";

export interface IUserRepository {
  getUserById(id: string): Promise<user>;
  createUser(data: CreateUserDTO): Promise<user>;
  updateUser(userId: string, data: UpdateUserDTO): Promise<user>;
  getUserByEmail(email: string): Promise<user>;
  getAllUsers(
    skip: number,
    take: number,
    search?: string
  ): Promise<ListAllUsersResponeType>;
}

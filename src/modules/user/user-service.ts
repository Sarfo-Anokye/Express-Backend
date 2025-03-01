import {user} from "@prisma/client";
import CustomError from "../../utils/custom-error";
import {PrismaUserRepository} from "./prisma-user-repository";
import {CreateUserDTO, UpdateUserDTO} from "./user-dto";
import {ListAllUsersResponeType} from "./interface/user-type";

export class UserService {
  constructor(private userRepository: PrismaUserRepository) {}

  async createUser(data: CreateUserDTO) {
    const user = await this.userExists(data.email);
    if (user)
      throw new CustomError("failed to create user, email already exist");
    return this.userRepository.createUser(data);
  }

  async updateUser(userId: string, data: UpdateUserDTO) {
    const user = await this.getUserById(userId);
    if (!user)
      throw new CustomError("failed to update user, user does not exist");

    // Check if the email is being updated and already exists
    const emailExists = await this.getUserByEmail(data.email);
    if (emailExists && emailExists.id != userId)
      throw new CustomError(
        "failed to update user,email is already in use by another user"
      );
    return await this.userRepository.updateUser(userId, data);
  }

  async deleteUser(user_id: string) {
    const user = await this.getUserById(user_id);
    if (!user)
      throw new CustomError("failed to delete user, user does not exist");

    return await this.userRepository.deleteUser(user_id);
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    if (!user) return false;
    return true;
  }

  async getUserById(user_id: string): Promise<user> {
    return await this.userRepository.getUserById(user_id);
  }

  async getUserByEmail(email: string): Promise<user> {
    return await this.userRepository.getUserByEmail(email);
  }

  async getAllUsers(
    skip: number = 0,
    take: number = 10,
    search?: string
  ): Promise<ListAllUsersResponeType> {
    return await this.userRepository.getAllUsers(skip, take, search);
  }
}

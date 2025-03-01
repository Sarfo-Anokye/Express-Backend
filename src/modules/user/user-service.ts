import CustomError from "../../utils/custom-error";
import {PrismaUserRepository} from "./prisma-user-repository";
import {CreateUserDTO} from "./user-dto";

export class UserService {
  constructor(private userRepository: PrismaUserRepository) {}

  //   async getUsers() {
  //     return this.userRepository.getAll();
  //   }

  //   async getUser(id: string) {
  //     return this.userRepository.getById(id);
  //   }

  async createUser(data: CreateUserDTO) {
    const user = await this.userExists(data.email);
    if (user)
      throw new CustomError("failed to create user, email already exist");
    return this.userRepository.createUser(data);
  }

  async userExists(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  //   async updateUser(id: string, data: UpdateUserDTO) {
  //     return this.userRepository.update(id, data);
  //   }

  //   async deleteUser(id: string) {
  //     return this.userRepository.delete(id);
  //   }
}

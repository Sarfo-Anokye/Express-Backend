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
    return this.userRepository.createUser(data);
  }

  //   async updateUser(id: string, data: UpdateUserDTO) {
  //     return this.userRepository.update(id, data);
  //   }

  //   async deleteUser(id: string) {
  //     return this.userRepository.delete(id);
  //   }
}

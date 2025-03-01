import {IUserRepository} from "./interface/user-repository-interface";
import {PrismaClient} from "@prisma/client/extension";
import {CreateUserDTO} from "./user-dto";

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: CreateUserDTO) {
    return await this.prisma.user.create({data});
  }
}

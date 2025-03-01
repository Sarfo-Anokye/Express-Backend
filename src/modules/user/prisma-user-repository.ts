import {IUserRepository} from "./interface/user-repository-interface";
import {PrismaClient} from "@prisma/client/extension";
import {CreateUserDTO} from "./user-dto";
import {user} from "@prisma/client";

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: CreateUserDTO): Promise<user> {
    return await this.prisma.user.create({data});
  }

  async findUserByEmail(email: string): Promise<user> {
    return await this.prisma.user.findUnique({where: {email}});
  }
}

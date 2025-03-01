import {IUserRepository} from "./interface/user-repository-interface";
import {PrismaClient} from "@prisma/client/extension";
import {CreateUserDTO, UpdateUserDTO} from "./user-dto";
import {user} from "@prisma/client";
import {ListAllUsersResponeType} from "./interface/user-type";

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: CreateUserDTO): Promise<user> {
    return await this.prisma.user.create({data});
  }
  async updateUser(userId: string, data: UpdateUserDTO): Promise<user> {
    return await this.prisma.user.update({
      where: {id: userId},
      data
    });
  }

  async deleteUser(userId: string): Promise<boolean> {
    await this.prisma.user.delete({
      where: {id: userId}
    });
    return true;
  }

  async getUserByEmail(email: string): Promise<user> {
    return await this.prisma.user.findUnique({where: {email}});
  }
  async getUserById(userId: string): Promise<user> {
    return await this.prisma.user.findUnique({where: {id: userId}});
  }

  async getAllUsers(
    skip: number = 0,
    take: number = 10,
    search?: string
  ): Promise<ListAllUsersResponeType> {
    const whereClause = search
      ? {
          OR: [
            {name: {contains: search, mode: "insensitive"}},
            {email: {contains: search, mode: "insensitive"}}
          ]
        }
      : {};

    const [users, totalUsers] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: whereClause,
        skip,
        take
      }),
      this.prisma.user.count({where: whereClause})
    ]);

    return {
      data: users,
      count: totalUsers
    };
  }
}

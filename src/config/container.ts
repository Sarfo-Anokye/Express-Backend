import {createContainer, asClass, asValue, InjectionMode} from "awilix";
import prisma from "./prisma";
import {LoggerService} from "../modules/logger/logger-service";
import {PrismaUserRepository} from "../modules/user/prisma-user-repository";
import {UserService} from "../modules/user/user-service";
import {UserController} from "../modules/user/user-controller";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
  strict: true
});

// Register dependencies
container.register({
  prisma: asValue(prisma),
  loggerService: asClass(LoggerService).singleton(),
  userRepository: asClass(PrismaUserRepository).singleton(),
  userService: asClass(UserService).singleton(),
  userController: asClass(UserController).singleton()
});

export default container;

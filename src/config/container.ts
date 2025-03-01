import {createContainer, asClass, asValue, InjectionMode} from "awilix";
import prisma from "./prisma";
import {LoggerService} from "../modules/logger/logger-service";
import {PrismaUserRepository} from "../modules/user/prisma-user-repository";
import {UserService} from "../modules/user/user-service";
import {UserController} from "../modules/user/user-controller";
import {PrismaMovieRepository} from "../modules/movie/prisma-movie-repository";
import {MovieController} from "../modules/movie/movie-controller";
import {MovieService} from "../modules/movie/movie-service";

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
  userController: asClass(UserController).singleton(),
  movieRepository: asClass(PrismaMovieRepository).singleton(),
  movieService: asClass(MovieService).singleton(),
  movieController: asClass(MovieController).singleton()
});

export default container;

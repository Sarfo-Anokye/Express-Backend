import {createContainer, asClass, asValue, InjectionMode} from "awilix";
import prisma from "./prisma";
import {LoggerService} from "../modules/logger/logger-service";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
  strict: true
});

// Register dependencies
container.register({
  prisma: asValue(prisma),
  loggerService: asClass(LoggerService).singleton()
});

export default container;

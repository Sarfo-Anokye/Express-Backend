import {createContainer, asClass, asValue, InjectionMode} from "awilix";
import prisma from "./prisma";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
  strict: true
});

// Register dependencies
container.register({
  prisma: asValue(prisma)
});

export default container;

import express from "express";
import {validate} from "../../middleware/validation-middleware";
import {createUserSchema} from "./user-schema";
import container from "../../config/container";
import {UserController} from "./user-controller";

const userRouter = express.Router();
const userController = container.resolve<UserController>("userController");

userRouter.post(
  "/",
  validate(createUserSchema),
  userController.createUser.bind(userController)
);

export default userRouter;

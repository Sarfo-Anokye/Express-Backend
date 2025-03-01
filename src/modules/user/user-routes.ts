import express from "express";
import {validate} from "../../middleware/validation-middleware";
import {createUserSchema, updateUserSchema} from "./user-schema";
import container from "../../config/container";
import {UserController} from "./user-controller";

const userRouter = express.Router();
const userController = container.resolve<UserController>("userController");

userRouter.post(
  "/",
  validate(createUserSchema),
  userController.createUser.bind(userController)
);
userRouter.put(
  "/:id",
  validate(updateUserSchema),
  userController.updateUser.bind(userController)
);
userRouter.get("/:id", userController.getUserById.bind(userController));
userRouter.get("/", userController.getAllUsers.bind(userController));
userRouter.delete("/:id", userController.deleteUser.bind(userController));

export default userRouter;

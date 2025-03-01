import express from "express";
import {validate} from "../../middleware/validation-middleware";
import {createUserSchema} from "./user-schema";

const userRouter = express.Router();

userRouter.post("/", validate(createUserSchema));

export default userRouter;

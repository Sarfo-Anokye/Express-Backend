import * as yup from "yup";
import {createUserSchema} from "./user-schema";

export type CreateUserDTO = yup.InferType<typeof createUserSchema>;
export type UpdateUserDTO = yup.InferType<typeof createUserSchema>;

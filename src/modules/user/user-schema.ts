import * as yup from "yup";

export const createUserSchema = yup
  .object({
    name: yup.string().required().min(3).required(),
    email: yup.string().email().required()
  })
  .strict();

export const updateUserSchema = yup
  .object({
    name: yup.string().required().min(3).required(),
    email: yup.string().email().required()
  })
  .strict();

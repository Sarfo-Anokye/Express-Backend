import * as yup from "yup";

export const createUserSchema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().email().required()
});

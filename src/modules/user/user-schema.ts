import * as yup from "yup";

export const creteUserSchema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().email().required()
});

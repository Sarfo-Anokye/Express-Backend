import * as yup from "yup";

export const createMovieSchema = yup
  .object({
    name: yup.string().required().min(3).required(),
    genre: yup.string().required()
  })
  .strict();

export const updateMovieSchema = yup
  .object({
    name: yup.string().required().min(3).required(),
    genre: yup.string().required()
  })
  .strict();

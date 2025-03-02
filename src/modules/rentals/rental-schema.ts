import * as yup from "yup";

export const rentMovieSchema = yup
  .object({
    user_id: yup.string().required().min(3).required(),
    movie_id: yup.string().required()
  })
  .strict();

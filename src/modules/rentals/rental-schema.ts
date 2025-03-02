import * as yup from "yup";

export const rentMovieSchema = yup
  .object({
    user_id: yup.string().required(),
    movie_id: yup.string().required()
  })
  .strict();

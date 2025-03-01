import * as yup from "yup";
import {createMovieSchema, updateMovieSchema} from "./movie-schema";

export type CreateMovieDTO = yup.InferType<typeof createMovieSchema>;
export type UpdateMovieDTO = yup.InferType<typeof updateMovieSchema>;

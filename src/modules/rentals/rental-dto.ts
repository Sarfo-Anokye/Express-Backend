import * as yup from "yup";
import {rentMovieSchema, returnMovieSchema} from "./rental-schema";

export type RentMovieDTO = yup.InferType<typeof rentMovieSchema>;
export type ReturnMovieDTO = yup.InferType<typeof returnMovieSchema>;

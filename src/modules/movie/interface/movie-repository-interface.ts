import {movie} from "@prisma/client";
import {CreateMovieDTO, UpdateMovieDTO} from "../movie-dto";
import {ListAllMoviesResponeType} from "./movie-type";

export interface IMovieRepository {
  getMovieById(id: string): Promise<movie>;
  deleteMovie(id: string): Promise<boolean>;
  createMovie(data: CreateMovieDTO): Promise<movie>;
  updateMovie(userId: string, data: UpdateMovieDTO): Promise<movie>;
  getAllMovies(
    skip: number,
    take: number,
    search?: string
  ): Promise<ListAllMoviesResponeType>;
}

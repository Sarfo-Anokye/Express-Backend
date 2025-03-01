import {movie, user} from "@prisma/client";
import CustomError from "../../utils/custom-error";
import {PrismaMovieRepository} from "./prisma-movie-repository";
import {CreateMovieDTO, UpdateMovieDTO} from "./movie-dto";
import {ListAllMoviesResponeType} from "./interface/movie-type";

export class MovieService {
  constructor(private movieRepository: PrismaMovieRepository) {}

  async createMovie(data: CreateMovieDTO) {
    return this.movieRepository.createMovie(data);
  }

  async updateMovie(movieId: string, data: UpdateMovieDTO) {
    const movie = await this.getMovieById(movieId);
    if (!movie)
      throw new CustomError(
        "failed to update movie, movie record does not exist"
      );

    return await this.movieRepository.updateMovie(movieId, data);
  }

  async deleteMovie(movieId: string) {
    const movie = await this.getMovieById(movieId);
    if (!movie)
      throw new CustomError(
        "failed to delete movie, movie record does not exist"
      );

    return await this.movieRepository.deleteMovie(movieId);
  }

  async getMovieById(movieId: string): Promise<movie> {
    return await this.movieRepository.getMovieById(movieId);
  }

  async getAllMovies(
    skip: number = 0,
    take: number = 10,
    search?: string
  ): Promise<ListAllMoviesResponeType> {
    return await this.movieRepository.getAllMovies(skip, take, search);
  }
}

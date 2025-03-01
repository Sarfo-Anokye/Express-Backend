import {movie} from "@prisma/client";
import {PrismaClient} from "@prisma/client/extension";
import {IMovieRepository} from "./interface/movie-repository-interface";
import {ListAllMoviesResponeType} from "./interface/movie-type";
import {CreateMovieDTO, UpdateMovieDTO} from "./movie-dto";

export class PrismaMovieRepository implements IMovieRepository {
  constructor(private prisma: PrismaClient) {}

  async createMovie(data: CreateMovieDTO): Promise<movie> {
    return await this.prisma.movie.create({data});
  }
  async updateMovie(movieId: string, data: UpdateMovieDTO): Promise<movie> {
    return await this.prisma.movie.update({
      where: {id: movieId},
      data
    });
  }

  async deleteMovie(movieId: string): Promise<boolean> {
    await this.prisma.movie.delete({
      where: {id: movieId}
    });
    return true;
  }

  async getMovieById(movieId: string): Promise<movie> {
    return await this.prisma.movie.findUnique({where: {id: movieId}});
  }

  async getAllMovies(
    skip: number = 0,
    take: number = 10,
    search?: string
  ): Promise<ListAllMoviesResponeType> {
    const whereClause = search
      ? {
          OR: [
            {name: {contains: search, mode: "insensitive"}},
            {genre: {contains: search, mode: "insensitive"}}
          ]
        }
      : {};

    const [users, totalUsers] = await this.prisma.$transaction([
      this.prisma.movie.findMany({
        where: whereClause,
        skip,
        take
      }),
      this.prisma.movie.count({where: whereClause})
    ]);

    return {
      data: users,
      count: totalUsers
    };
  }
}

import {NextFunction, Request, Response} from "express";
import {LoggerService} from "../logger/logger-service";
import {MovieService} from "./movie-service";

export class MovieController {
  private readonly logger;
  constructor(
    private movieService: MovieService,
    private loggerService: LoggerService
  ) {
    this.logger = this.loggerService.getLogger("movie");
  }

  async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await this.movieService.createMovie(req.body);
      res.status(201).json({data: movie, message: "movie created sucessfuly"});
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
  async updateMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const movie = await this.movieService.updateMovie(id, req.body);

      res.status(200).json({data: movie, message: "movie updated sucessfuly"});
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
  async getMovieById(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const movie = await this.movieService.getMovieById(id);
      res.status(200).json(movie);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
  async getAllMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 10;
      const search = req.query.search as string | undefined;

      const movies = await this.movieService.getAllMovies(skip, take, search);
      res.status(200).json(movies);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
  async deleteMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      await this.movieService.deleteMovie(id);
      return res.status(200).json({message: "Movie deleted sucessfuly"});
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
}

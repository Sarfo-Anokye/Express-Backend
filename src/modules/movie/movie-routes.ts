import express from "express";
import {validate} from "../../middleware/validation-middleware";
import container from "../../config/container";
import {createMovieSchema, updateMovieSchema} from "./movie-schema";
import {MovieController} from "./movie-controller";

const movieRouter = express.Router();
const movieController = container.resolve<MovieController>("movieController");

movieRouter.post(
  "/",
  validate(createMovieSchema),
  movieController.createMovie.bind(movieController)
);
movieRouter.put(
  "/:id",
  validate(updateMovieSchema),
  movieController.updateMovie.bind(movieController)
);
movieRouter.get("/:id", movieController.getMovieById.bind(movieController));
movieRouter.get("/", movieController.getAllMovies.bind(movieController));
movieRouter.delete("/:id", movieController.deleteMovie.bind(movieController));

export default movieRouter;

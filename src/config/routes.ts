import express from "express";
import userRouter from "../modules/user/user-routes";
import movieRouter from "../modules/movie/movie-routes";
import rentalRouter from "../modules/rentals/rental-routes";

const routes = express.Router();

routes.use("/users", userRouter);

routes.use("/movies", movieRouter);

routes.use("/rentals", rentalRouter);

export default routes;

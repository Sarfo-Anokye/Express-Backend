import express from "express";
import userRouter from "../modules/user/user-routes";
import movieRouter from "../modules/movie/movie-routes";

const routes = express.Router();

routes.use("/users", userRouter);

routes.use("/movies", movieRouter);

export default routes;

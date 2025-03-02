import express from "express";
import container from "../../config/container";
import {validate} from "../../middleware/validation-middleware";
import {RentalController} from "./rental-controller";
import {rentMovieSchema} from "./rental-schema";

const rentalRouter = express.Router();
const rentalController =
  container.resolve<RentalController>("rentalController");
rentalRouter.post(
  "/",
  validate(rentMovieSchema),
  rentalController.rentMovie.bind(rentalController)
);
rentalRouter.put("/:id", rentalController.returnMovie.bind(rentalController));

rentalRouter.get("/", rentalController.getAllRentals.bind(rentalController));

export default rentalRouter;

import {NextFunction, Request, Response} from "express";
import {RentalService} from "./rental-service";
import {LoggerService} from "../logger/logger-service";

export class RentalController {
  private readonly logger;
  constructor(
    private rentalService: RentalService,
    private loggerService: LoggerService
  ) {
    this.logger = this.loggerService.getLogger("movie");
  }

  async rentMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const {user_id, movie_id} = req.body;
      const rentedAt = new Date();
      const dueDate = new Date();
      dueDate.setDate(rentedAt.getDate() + 7); // Due in 7 days
      const data = {
        rented_at: rentedAt,
        due_date: dueDate,
        user_id,
        movie_id
      };
      const rental = await this.rentalService.rentMovie(data);
      res.status(201).json(rental);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }

  async returnMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const {rentalId} = req.params;
      const rental = await this.rentalService.returnMovie(rentalId);
      res.status(200).json(rental);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }

  async getAllRentals(req: Request, res: Response, next: NextFunction) {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 10;
      const rentals = await this.rentalService.getAllRentals(skip, take);
      res.status(200).json(rentals);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
}

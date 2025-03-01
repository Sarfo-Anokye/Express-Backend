import {NextFunction, Request, Response} from "express";
import {UserService} from "./user-service";
import {LoggerService} from "../logger/logger-service";

export class UserController {
  private readonly logger;
  constructor(
    private userService: UserService,
    private loggerService: LoggerService
  ) {
    this.logger = this.loggerService.getLogger("user");
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
}

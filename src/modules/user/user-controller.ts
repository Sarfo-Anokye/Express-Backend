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
      res.status(201).json({data: user, message: "user created sucessfuly"});
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const user = await this.userService.updateUser(id, req.body);

      res.status(200).json({data: user, message: "user updated sucessfuly"});
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const user = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 10;
      const search = req.query.search as string | undefined;

      const users = await this.userService.getAllUsers(skip, take, search);
      res.status(200).json(users);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      await this.userService.deleteUser(id);
      return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
}

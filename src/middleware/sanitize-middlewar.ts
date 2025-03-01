import {Request, Response, NextFunction} from "express";
import SanitizeInput from "../helpers/sanitize-inputs";

const sanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body = SanitizeInput(req.body);
  req.query = SanitizeInput(req.query);
  req.params = SanitizeInput(req.params);
  next();
};

export default sanitizeMiddleware;

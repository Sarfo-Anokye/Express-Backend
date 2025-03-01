import {ValidationError} from "yup";
import {Request, Response, NextFunction, ErrorRequestHandler} from "express";
import CustomError from "../utils/custom-error";

const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof ValidationError) {
    res.status(400).json({
      success: false,
      message: error.message
    });
    return;
  }

  if (error instanceof CustomError) {
    res.status(400).json({
      success: false,
      message: error.message
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: `An unexpected error occurred. Please try again or contact support if the issue persists.`
  });
  return;
};

export default errorHandler;

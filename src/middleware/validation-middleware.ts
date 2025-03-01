import {Request, Response, NextFunction} from "express";
import {AnyObjectSchema} from "yup";

export const validate =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, {abortEarly: false});
      next(); // If validation passes, proceed to the next middleware/controller
    } catch (error) {
      res.status(400).json({
        errors: error.inner.map((err: any) => ({
          path: err.path,
          message: err.message
        }))
      });
    }
  };

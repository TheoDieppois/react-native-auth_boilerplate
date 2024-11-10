import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors/AuthError";
import { ValidationError } from "../errors/ValidationError";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AuthError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });

    return;
  }

  if (error instanceof ValidationError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      details: error.details,
    });

    return;
  }

  res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
};

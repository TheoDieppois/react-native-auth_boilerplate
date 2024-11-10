import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthError } from "../errors/AuthError";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AuthError(401, "Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    if (typeof decoded !== "object" || !decoded?.userId) {
      throw new AuthError(401, "Unauthorized");
    }

    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError(401, "Unauthorized");
  }
};

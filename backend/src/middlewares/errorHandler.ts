import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ENV } from "../config/env";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      code: err.code,
    });
    return;
  }

  console.error("💥 Unhandled error:", err);

  res.status(500).json({
    status: "error",
    message:
      ENV.NODE_ENV === "production" ? "Something went wrong" : err.message, 
  });
};

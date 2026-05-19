import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ENV } from "../config/env";

// For user authentication
export const generateToken = (userId: string, res: Response): string => {
  if (!ENV.JWT_SECRET || !ENV.JWT_EXPIRES_IN) {
    throw new Error("JWT env variables not configured");
  }

  const token = jwt.sign({ id: userId }, ENV.JWT_SECRET as jwt.Secret, {
    expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS atacks: cross-site scripting
    sameSite: "strict", // CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};

// For admin authentication
export const generateAdminToken = (res: Response): string => {
  if (!ENV.JWT_SECRET || !ENV.JWT_EXPIRES_IN) {
    throw new Error("JWT env variables not configured");
  }

  const token = jwt.sign({ role: "admin" }, ENV.JWT_SECRET as jwt.Secret, {
    expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });

  res.cookie("admin_jwt", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS atacks: cross-site scripting
    sameSite: "strict", // CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};

export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next); // passes error to errorHandler
  };

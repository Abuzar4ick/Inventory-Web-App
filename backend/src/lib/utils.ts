import jwt from "jsonwebtoken";
import { Response } from "express";
import { ENV } from "../config/env";

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

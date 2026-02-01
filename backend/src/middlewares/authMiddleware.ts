/// <reference path="../../types/globals.d.ts" />
import express, { Response, NextFunction } from "express";
import * as queries from "../db/queries";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env";

export const protectRoute = async (
  req: express.Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, ENV.JWT_SECRET as jwt.Secret) as JwtPayload;
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (!decoded?.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    const user = await queries.getUserById(decoded.id);
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error);
    res.status(401).json({ error: "Unauthorized access" });
  }
};

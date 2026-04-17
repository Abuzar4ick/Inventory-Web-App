import type { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// This middleware takes any Zod schema and validates req.body against it
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Collect all error messages into a clean array
      const errors = result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return res.status(400).json({ errors });
    }

    // Replace req.body with the validated (and typed) data
    req.body = result.data;
    next();
  };
};

import type { Request, Response } from "express";
import { asyncHandler } from "../../lib/utils";
import { adminService } from "./admin.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { admin_name, password } = req.body;
  const token = await adminService.registerAdmin({ admin_name, password }, res);

  res.status(200).json({
    message: "Admin registration was successful",
    token,
  });
});

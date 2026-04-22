import type { Request, Response } from "express";
import { authService } from "./auth.service";
import { asyncHandler } from "../../lib/utils";

export const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, username, password } = req.body;
  const token = await authService.signup({ name, username, password }, res);

  res.status(201).json({
    message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
    token,
  });
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await authService.login({ username, password }, res);

  res.status(200).json({
    message: "Foydalanuvchi muvaffaqiyatli tizimga kirdi",
    token,
  });
});

export const logoutUser = asyncHandler(async (_: any, res: Response) => {
  await authService.logout(res);
  res
    .status(200)
    .json({ message: "Foydalanuvchi muvaffaqiyatli tizimdan chiqdi" });
});

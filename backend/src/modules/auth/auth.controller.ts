import type { Request, Response } from "express";
import { authService } from "./auth.service";

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;
    const token = await authService.signup({ name, username, password }, res);

    res.status(201).json({
      message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
      token,
    });
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login({ username, password }, res);

    res.status(200).json({
      message: "Foydalanuvchi muvaffaqiyatli tizimga kirdi",
      token,
    });
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = (_: any, res: Response) => {
  authService.logout(res);
  res
    .status(200)
    .json({ message: "Foydalanuvchi muvaffaqiyatli tizimdan chiqdi" });
};

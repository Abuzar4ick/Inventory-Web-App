import type { Request, Response } from "express";
import { authRepository } from "./auth.repository";
import bcrypt from "bcrypt";
import { generateToken } from "../../lib/utils";
import { ENV } from "../../config/env";

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ error: "Barcha maydonlar to'ldirilishi kerak" });
    }

    const existingUser = await authRepository.getUserByUsername(username);
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Bu foydalanuvchi nomi band qilingan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authRepository.createUser({
      name,
      username,
      password: hashedPassword,
    });

    const token = await generateToken(newUser.id, res);

    res.status(201).json({
      message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
      token,
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Barcha maydonlar to'ldirilishi kerak" });
    }

    const user = await authRepository.getUserByUsername(username);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Noto'g'ri foydalanuvchi nomi yoki parol" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Noto'g'ri foydalanuvchi nomi yoki parol" });
    }

    const token = await generateToken(user.id, res);

    res.status(200).json({
      message: "Foydalanuvchi muvaffaqiyatli tizimga kirdi",
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = (_: any, res: Response) => {
  res.cookie("jwt", "", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  res
    .status(200)
    .json({ message: "Foydalanuvchi muvaffaqiyatli tizimdan chiqdi" });
};

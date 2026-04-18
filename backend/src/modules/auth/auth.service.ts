import type { Response } from "express";
import { authRepository } from "./auth.repository";
import bcrypt from "bcrypt";
import { generateToken } from "../../lib/utils";
import { ENV } from "../../config/env";
import { NewUser, User } from "../../db/types";

export const authService = {
  async signup(data: NewUser, res: Response) {
    const existingUser = await authRepository.getUserByUsername(data.username);
    if (existingUser) {
      throw { status: 409, message: "Bu foydalanuvchi nomi band qilingan" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await authRepository.createUser({
      name: data.name,
      username: data.username,
      password: hashedPassword,
    });

    return generateToken(newUser.id, res);
  },

  async login(data: { username: string; password: string }, res: Response) {
    const user = await authRepository.getUserByUsername(data.username as string);
    if (!user) {
      throw { status: 401, message: "Noto'g'ri foydalanuvchi nomi yoki parol" };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw { status: 401, message: "Noto'g'ri foydalanuvchi nomi yoki parol" };
    }

    return generateToken(user.id, res);
  },

  logout(res: Response) {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: ENV.NODE_ENV !== "development",
    });
  },
};

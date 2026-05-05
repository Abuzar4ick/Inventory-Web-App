import type { Response } from "express";
import { authRepository } from "./auth.repository";
import bcrypt from "bcrypt";
import { generateToken } from "../../lib/utils";
import { ENV } from "../../config/env";
import { NewUser, User } from "../../db/types";
import { ConflictError, UnauthorizedError } from "../../errors";

export const authService = {
  async signup(data: NewUser, res: Response) {
    const existingUser = await authRepository.getUserByUsername(data.username);
    if (existingUser) {
      throw new ConflictError("Bu foydalanuvchi nomi allaqachon mavjud");
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
    const user = await authRepository.getUserByUsername(
      data.username as string,
    );
    if (!user) {
      throw new UnauthorizedError("Noto'g'ri foydalanuvchi nomi yoki parol");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Noto'g'ri foydalanuvchi nomi yoki parol");
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

  async getProfile(userId: string) {
    const user = await authRepository.getUserById(userId);
    if (!user) throw new UnauthorizedError("Foydalanuvchi topilmadi");

    return user;
  },

  async updateProfile(profile: User, userId: string) {
    let { name, username, phone_number } = profile;

    const user = await authRepository.getUserById(userId);
    if (!user) {
      throw new UnauthorizedError("Foydalanuvchi topilmadi");
    }

    name = name?.trim();
    username = username?.trim();
    phone_number = phone_number?.trim();

    if (username && username !== user.username) {
      const existingUser = await authRepository.getUserByUsername(username);
      if (existingUser) {
        throw new ConflictError("Bu foydalanuvchi nomi allaqachon mavjud");
      }
    }

    const updatedUser = await authRepository.updateUserProfile(
      userId,
      name || user.name,
      username || user.username,
      phone_number || user.phone_number,
    );

    return {
      status: 200,
      message: "Profile muvaffaqiyatli yangilandi",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        phone_number: updatedUser.phone_number,
      },
    };
  },

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await authRepository.getPasswordByUserId(userId);
    if (!user) {
      throw new UnauthorizedError("Foydalanuvchi topilmadi");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedError("Joriy parol noto'g'ri");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    return authRepository.changePassword(userId, hashedNewPassword);
  },
};

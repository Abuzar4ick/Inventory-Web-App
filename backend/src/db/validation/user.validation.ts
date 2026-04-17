import { createInsertSchema } from "drizzle-zod";
import { users } from "../schema/user.schema";
import { z } from "zod";

// For signup: name, username, password — all required
export const signupSchema = createInsertSchema(users, {
  name: (s) => s.min(2, "Ism kamida 2 ta belgidan iborat bo‘lishi kerak"),
  username: (s) => s.min(3, "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo‘lishi kerak"),
  password: (s) => s.min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak"),
}).pick({ name: true, username: true, password: true });

// For login: just username + password
export const loginSchema = z.object({
  username: z.string().min(1, "Foydalanuvchi nomi kiritilishi shart"),
  password: z.string().min(1, "Parol kiritilishi shart"),
});

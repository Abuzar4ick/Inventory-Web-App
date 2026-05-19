import { z } from "zod";

export const adminAuthSchema = z.object({
  admin_name: z.string().min(1, "Admin nomi kiritilishi shart"),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak"),
});

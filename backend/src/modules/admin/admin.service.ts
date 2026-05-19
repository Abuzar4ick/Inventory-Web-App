import type { Response } from "express";
import { generateAdminToken } from "../../lib/utils";
import { UnauthorizedError } from "../../errors";

interface AdminData {
  admin_name: string;
  password: string;
}

export const adminService = {
  async registerAdmin(adminData: AdminData, res: Response) {
    if (
      adminData.admin_name === process.env.ADMIN_NAME as string &&
      adminData.password === process.env.ADMIN_PASSWORD as string
    ) {
      return generateAdminToken(res);
    }

    throw new UnauthorizedError("Noto'g'ri admin ma'lumotlari kiritildi");
  },
};

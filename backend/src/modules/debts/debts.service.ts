import { debtsRepository } from "./debts.repository";
import { NewDebt } from "../../db/types";

export const debtsService = {
  async create(data: NewDebt) {
    const debt = await debtsRepository.createDebt(data);
    return { status: 201, data: debt };
  },

  async getDebts(userId: string) {
    const debts = await debtsRepository.getDebtByUserId(userId);
    return { status: 200, data: debts };
  },

  async getDebtById(id: string, requestingUserId: string) {
    const debt = await debtsRepository.getDebtById(id);
    if (!debt) {
      throw { status: 404, message: "Qarz topilmadi" };
    }
    if (debt.userId !== requestingUserId) {
      throw {
        status: 403,
        message: "Siz bu qarzni ko'rish huquqiga ega emassiz",
      };
    }

    return { status: 200, data: debt };
  },

  async updateDebt(
    id: string,
    data: Partial<NewDebt>,
    requestingUserId: string,
  ) {
    const existing = await debtsRepository.getDebtById(id);
    if (!existing) {
      throw { status: 404, message: "Qarz topilmadi" };
    }
    if (existing.userId !== requestingUserId) {
      throw {
        status: 403,
        message: "Siz bu qarzni yangilash huquqiga ega emassiz",
      };
    }

    const updatedDebt = await debtsRepository.updateDebt(id, data);
    return {
      status: 200,
      data: updatedDebt,
      message: "Qarz muvaffaqiyatli yangilandi",
    };
  },

  async deleteDebt(id: string, requestingUserId: string) {
    const existing = await debtsRepository.getDebtById(id);
    if (!existing) {
      throw { status: 404, message: "Qarz topilmadi" };
    }
    if (existing.userId !== requestingUserId) {
      throw {
        status: 403,
        message: "Siz bu qarzni o'chirish huquqiga ega emassiz",
      };
    }

    const deletedDebt = await debtsRepository.deleteDebt(id);
    return {
      status: 200,
      data: deletedDebt,
      message: "Qarz muvaffaqiyatli o'chirildi",
    };
  },

  async getStats(userId: string) {
    const stats = await debtsRepository.getStatsOfDebts(userId);
    return { status: 200, data: stats };
  },

  async markAsPaid(id: string, requestingUserId: string) {
    const existing = await debtsRepository.getDebtById(id);
    if (!existing) {
      throw { status: 404, message: "Qarz topilmadi" };
    }
    if (existing.userId !== requestingUserId) {
      throw {
        status: 403,
        message: "Siz bu qarzni to'lash huquqiga ega emassiz",
      };
    }

    const updatedDebt = await debtsRepository.markAsPaid(id);
    return {
      status: 200,
      data: updatedDebt,
      message: "Qarz muvaffaqiyatli to'landi",
    };
  },
};

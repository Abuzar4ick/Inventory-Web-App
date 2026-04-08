import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useDebtStore = create((set, get) => ({
  statistics: [],
  debts: [],
  areStatisticsGetting: false,
  isAdding: false,
  areDebtsGetting: false,
  isUpdating: false,
  isDeleting: false,
  isMarkingAsPaid: false,

  getStatistics: async () => {
    set({ areStatisticsGetting: true });

    try {
      const response = await axiosInstance.get("/debtors/stats");
      set({ statistics: response.data });
    } catch (error) {
      toast.error("Statistikani olishda xatolik yuz berdi");
      console.error("Error getting statistics:", error);
    } finally {
      set({ areStatisticsGetting: false });
    }
  },

  addNewDebt: async (data) => {
    set({ isAdding: true });

    try {
      await axiosInstance.post("/debtors", data);
      toast.success("Qarz muvaffaqiyatli qo'shildi");
      get().getStatistics();
    } catch (error) {
      toast.error("Qarz qo'shishda xatolik yuz berdi");
      console.error("Error adding new debt:", error);
    } finally {
      set({ isAdding: false });
    }
  },

  getAllDebts: async () => {
    set({ areDebtsGetting: true });

    try {
      const response = await axiosInstance.get("/debtors");
      set({ debts: response.data });
    } catch (error) {
      toast.error("Qarzlarni olishda xatolik yuz berdi");
      console.error("Error getting all debts:", error);
    } finally {
      set({ areDebtsGetting: false });
    }
  },

  updateDebt: async (id, data) => {
    set({ isUpdating: true });

    try {
      await axiosInstance.put(`/debtors/${id}`, data);
      toast.success("Qarz muvaffaqiyatli yangilandi");
      get().getAllDebts();
      get().getStatistics();
    } catch (error) {
      toast.error("Qarz yangilashda xatolik yuz berdi");
      console.error("Error updating debt:", error);
    } finally {
      set({ isUpdating: false });
    }
  },

  deleteDebt: async (id) => {
    set({ isDeleting: true });

    try {
      await axiosInstance.delete(`/debtors/${id}`);
      toast.success("Qarz muvaffaqiyatli o'chirildi");
      get().getAllDebts();
      get().getStatistics();
    } catch (error) {
      toast.error("Qarz o'chirishda xatolik yuz berdi");
      console.error("Error deleting debt:", error);
    } finally {
      set({ isDeleting: false });
    }
  },

  markAsPaid: async (id) => {
    set({ isMarkingAsPaid: true });

    try {
      await axiosInstance.put(`/debtors/${id}/status`, { status: "paid" });
      toast.success("Qarz to'langan deb belgilandi");
      get().getAllDebts();
      get().getStatistics();
    } catch (error) {
      toast.error("Qarz holatini o'zgartirishda xatolik yuz berdi");
      console.error("Error marking debt as paid:", error);
    } finally {
      set({ isMarkingAsPaid: false });
    }
  },
}));

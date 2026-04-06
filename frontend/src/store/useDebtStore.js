import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useDebtStore = create((set, get) => ({
  statistics: [],
  areStatisticsGetting: false,
  isAdding: false,

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
      get().getStatistics(); // Refresh statistics after adding new debt
    } catch (error) {
      toast.error("Qarz qo'shishda xatolik yuz berdi");
      console.error("Error adding new debt:", error);
    } finally {
      set({ isAdding: false });
    }
  },
}));

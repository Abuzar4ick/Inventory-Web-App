import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useDebtorStore = create((set, get) => ({
  statistics: [],
  areStatisticsGetting: false,

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
}));

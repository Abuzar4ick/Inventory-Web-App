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
      const res = await axiosInstance.post("/debtors", data);

      set((state) => ({
        debts: [res.data, ...state.debts],
      }));

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
      const res = await axiosInstance.put(`/debtors/${id}`, data);

      set((state) => ({
        debts: state.debts.map((d) => (d.id === id ? res.data : d)),
      }));

      toast.success("Yangilandi");
      get().getStatistics();
    } catch (error) {
      toast.error("Xatolik");
    } finally {
      set({ isUpdating: false });
    }
  },

  deleteDebt: async (id) => {
    set({ isDeleting: true });

    try {
      await axiosInstance.delete(`/debtors/${id}`);

      set((state) => ({
        debts: state.debts.filter((d) => d.id !== id),
      }));

      toast.success("Qarz muvaffaqiyatli o'chirildi");
      get().getStatistics();
    } catch (error) {
      toast.error("Qarz o'chirishda xatolik yuz berdi");
    } finally {
      set({ isDeleting: false });
    }
  },

  markAsPaid: async (id) => {
    set({ isMarkingAsPaid: true });

    try {
      await axiosInstance.put(`/debtors/${id}/status`, { status: "paid" });

      set((state) => ({
        debts: state.debts.map((d) =>
          d.id === id ? { ...d, status: "paid" } : d,
        ),
      }));

      toast.success("Qarz to'langan deb belgilandi");
      get().getStatistics();
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    } finally {
      set({ isMarkingAsPaid: false });
    }
  },
}));

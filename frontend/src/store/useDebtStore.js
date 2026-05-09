import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { getErrorMessage } from "../lib/errorHandler";
import toast from "react-hot-toast";

export const useDebtStore = create((set, get) => ({
  statistics: [],
  debts: null,
  areStatisticsGetting: false,
  isAdding: false,
  areDebtsGetting: false,
  isUpdating: false,
  isDeleting: false,
  isMarkingAsPaid: false,

  getStatistics: async () => {
    set({ areStatisticsGetting: true });

    try {
      const response = await axiosInstance.get("/debts/stats");
      set({ statistics: response.data.data });
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error("Error getting statistics:", error);
    } finally {
      set({ areStatisticsGetting: false });
    }
  },

  addNewDebt: async (data) => {
    set({ isAdding: true });

    try {
      const res = await axiosInstance.post("/debts", data);

      set((state) => ({
        debts: [res.data.data, ...state.debts],
      }));

      toast.success("Qarz muvaffaqiyatli qo'shildi");
      get().getStatistics();
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error("Error adding new debt:", error);
    } finally {
      set({ isAdding: false });
    }
  },

  getAllDebts: async () => {
    set({ areDebtsGetting: true });

    try {
      const response = await axiosInstance.get("/debts");
      set({ debts: response.data.data });
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error("Error getting all debts:", error);
    } finally {
      set({ areDebtsGetting: false });
    }
  },

  updateDebt: async (id, data) => {
    set({ isUpdating: true });

    try {
      const res = await axiosInstance.put(`/debts/${id}`, data);

      set((state) => ({
        debts: state.debts.map((d) => (d.id === id ? res.data.data : d)),
      }));

      toast.success("Yangilandi");
      get().getStatistics();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isUpdating: false });
    }
  },

  deleteDebt: async (id) => {
    set({ isDeleting: true });

    try {
      await axiosInstance.delete(`/debts/${id}`);

      set((state) => ({
        debts: state.debts.filter((d) => d.id !== id),
      }));

      toast.success("Qarz muvaffaqiyatli o'chirildi");
      get().getStatistics();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isDeleting: false });
    }
  },

  markAsPaid: async (id) => {
    set({ isMarkingAsPaid: true });

    try {
      await axiosInstance.put(`/debts/${id}/status`, { status: "paid" });

      set((state) => ({
        debts: state.debts.map((d) =>
          d.id === id ? { ...d, status: "paid" } : d,
        ),
      }));

      toast.success("Qarz to'langan deb belgilandi");
      get().getStatistics();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isMarkingAsPaid: false });
    }
  },
}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { getErrorMessage } from "../lib/errorHandler";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      await axiosInstance.post("/auth/signup", data);
      // Token is set in cookie, check auth on next request
      await get().checkAuth();

      toast.success("Hisob muvaffaqiyatli yaratildi!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      await axiosInstance.post("/auth/login", data);
      // Token is set in cookie, check auth on next request
      await get().checkAuth();

      toast.success("Hisobga muvaffaqiyatli kirdingiz!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Hisobdan muvaffaqiyatli chiqildi!");
    } catch (error) {
      toast.error("Hisobdan chiqishda xatolik yuz berdi");
      console.log("Logout error:", error);
    }
  },
}));

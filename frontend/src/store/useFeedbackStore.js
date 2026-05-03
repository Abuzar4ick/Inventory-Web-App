import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { getErrorMessage } from "../lib/errorHandler";
import toast from "react-hot-toast";

export const useFeedbackStore = create((set) => ({
  isErrorMsgSending: false,
  isReqMsgSending: false,

  sendErrorMessage: async (message) => {
    set({ isErrorMsgSending: true });

    try {
      await axiosInstance.post("/feedbacks", {
        type: "bug_report",
        message,
      });

      toast.success("Xatolik haqida xabar muvaffaqiyatli yuborildi");
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error("Error sending error message:", error.response?.data);
    } finally {
      set({ isErrorMsgSending: false });
    }
  },

  sendReqMessage: async (message) => {
    set({ isReqMsgSending: true });

    try {
      await axiosInstance.post("/feedbacks", {
        type: "feature_request",
        message,
      });

      toast.success("Taklifingiz muvaffaqiyatli yuborildi");
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error("Error sending error message:", error.response?.data);
    } finally {
      set({ isReqMsgSending: false });
    }
  },
}));

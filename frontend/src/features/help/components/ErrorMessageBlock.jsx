import { useState } from "react";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import toast from "react-hot-toast";
// icon
import { LuSend } from "react-icons/lu";

const ErrorMessageBlock = () => {
  const { sendErrorMessage } = useFeedbackStore();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message || message.length < 10) {
      toast.error(
        "Xatolik haqida xabar kamida 10 harifdan iborat bo'lishi kerak",
      );

      return;
    }

    sendErrorMessage(message).then(() => setMessage(""));
  };

  return (
    <div className="w-full flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-[750px] p-4 sm:p-6 rounded-lg flex flex-col gap-6 shadow-md"
      >
        <h2 className="text-xl font-semibold">Xatolik haqida xabar berish</h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 outline-[#ef4343] min-h-25 max-h-100"
          placeholder="Muammo haqida yozing..."
        ></textarea>

        <button className="btn bg-[#ef4343] text-white flex items-center gap-2">
          <LuSend />
          Yuborish
        </button>
      </form>
    </div>
  );
};

export default ErrorMessageBlock;

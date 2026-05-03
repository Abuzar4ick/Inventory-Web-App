import { useState } from "react";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import toast from "react-hot-toast";
// icon
import { LuSend } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";

const RequestMessageBlock = () => {
  const { sendReqMessage, isReqMsgSending } = useFeedbackStore();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message || message.length < 5) {
      toast.error("Taklif kamida 5 harifdan iborat bo'lishi kerak");

      return;
    }

    sendReqMessage(message).then(() => setMessage(""));
  };

  return (
    <div className="w-full flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-[750px] p-4 sm:p-6 rounded-lg flex flex-col gap-6 shadow-md"
      >
        <h2 className="text-xl font-semibold">Taklif yuborish</h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 outline-primary min-h-25 max-h-100"
          placeholder="Taklifingizni yozing..."
        ></textarea>

        <button type="submit" disabled={isReqMsgSending} className="btn btn-primary text-white flex items-center gap-2">
          {isReqMsgSending ? (
            <FiLoader className="animate-spin text-lg" />
          ) : (
            <>
              {" "}
              <LuSend />
              Yuborish{" "}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RequestMessageBlock;

// icons
import { IoCallOutline, IoChatbubbleOutline } from "react-icons/io5";

const ContactBlock = () => {
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
  const telegramUrl = import.meta.env.VITE_TELEGRAM_URL;

  const handleTelegram = () => {
    window.open(telegramUrl, "_blank");
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="bg-white w-full max-w-[750px] p-4 sm:p-6 rounded-lg flex flex-col gap-6 shadow-md">
        <h1 className="text-lg sm:text-xl font-bold">Aloqa</h1>

        <div className="flex flex-col gap-5">
          {/* Phone */}
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition"
          >
            <IoCallOutline size={24} className="text-primary" />
            <div>
              <p className="text-sm text-gray-600">Telefon</p>
              <p className="font-semibold">{phoneNumber}</p>
            </div>
          </a>

          {/* Telegram button */}
          <button
            onClick={handleTelegram}
            className="btn btn-primary w-full flex items-center justify-center gap-2 text-white rounded-lg py-3"
          >
            <IoChatbubbleOutline size={20} />
            Telegram orqali yozish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactBlock;
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
// icons
import { FiLoader } from "react-icons/fi";

const ChangePassword = () => {
  const { isPasswordChanging, changePassword } = useAuthStore();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isDisabled = () =>
    formData.oldPassword === "" ||
    formData.newPassword === "" ||
    formData.confirmPassword === "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Yangi parol va tasdiqlama paroli mos kelmadi!");
      return;
    }

    await changePassword({ currentPassword: formData.oldPassword, newPassword: formData.newPassword });
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="bg-white w-full max-w-[750px] p-4 sm:p-6 rounded-lg flex flex-col gap-6 shadow-md">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Xavfsizlik</h2>
          <p className="text-gray-600">
            Parolni o'zgartirish va himoya sozlamalari
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Eski parol
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Eski parolni kiriting"
              className="input input-bordered bg-[#f6f7f9] w-full"
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Yangi parol
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Yangi parolni kiriting"
                className="input input-bordered bg-[#f6f7f9] w-full"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Parolni qayta kiriting"
                className="input input-bordered bg-[#f6f7f9] w-full"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPasswordChanging || isDisabled()}
          >
            {isPasswordChanging ? (
              <FiLoader className="animate-spin text-lg" />
            ) : (
              "Parolni o'zgartirish"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

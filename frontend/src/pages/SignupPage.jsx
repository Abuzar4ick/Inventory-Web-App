import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !username || !password) {
      return toast.error("Barcha ma'lumotlar talab qilinadi");
    }

    signup({ name, username, password });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-8 text-center"
        >
          {/* Title */}
          <p className="text-3xl font-bold">Yangi hisob yaratish</p>

          <p className="text-gray-500 text-md">
            Ro'yxatdan o'ting va tizimdan foydalanishni boshlang
          </p>

          <div className="flex flex-col gap-4 text-start text-lg">
            {/* Name */}
            <div>
              <label className="font-bold text-md">Ismingiz</label>
              <input
                type="text"
                placeholder="Masalan: Abuzar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label className="font-bold text-md">Foydalanuvchi nomi</label>
              <input
                type="text"
                placeholder="Login uchun username kiriting"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="font-bold text-md">Parol</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Kuchli parol o'ylab toping"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pr-12"
                required
              />

              {/* Eye icon */}
              {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 text-xl z-10"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button> */}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary text-white w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <FiLoader className="animate-spin text-lg" />
              ) : (
                "Ro'yxatdan o'tish"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

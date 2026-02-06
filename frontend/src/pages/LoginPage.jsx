import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      return toast.error("Barcha ma'lumotlar talab qilinadi");
    }

    login({ username, password });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-8 text-center"
        >
          {/* Title */}
          <p className="text-3xl font-bold">Hush Kelibsiz</p>

          <p className="text-gray-500 text-md">
            Davom etish uchun login ma’lumotlaringizni kiriting
          </p>

          <div className="flex flex-col gap-4 text-start text-lg">
            {/* Username */}
            <div>
              <label className="font-bold text-md">Foydalanuvchi nomi</label>
              <input
                type="text"
                placeholder="Foydalanuvchi nomingizni kiriting"
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
                placeholder="Parolingizni kiriting"
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
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <FiLoader className="animate-spin text-lg" />
              ) : (
                "Kirish"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

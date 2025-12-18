import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { FiLoader } from "react-icons/fi";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isSigningUp } = useAuthStore();

  const handleToggleShow = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullname || !username || !password) {
      return toast.error("Barcha maydonlar talab qilinadi");
    }

    signup({ name: fullname, username, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
          Ro'yxatdan o'tish
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              To‘liq ism
            </label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="To‘liq ism..."
              className="input input-bordered w-full bg-white text-black border-gray-400"
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Foydalanuvchi nomi
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Foydalanuvchi nomi..."
              className="input input-bordered w-full bg-white text-black border-gray-400"
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Parol
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol..."
                className="input input-bordered w-full bg-white text-black border-gray-400"
              />
              <button
                type="button"
                onClick={handleToggleShow}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black text-xl"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`auth-btn ${
              isSigningUp ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <FiLoader className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              "Ro'yxatdan o'tish"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

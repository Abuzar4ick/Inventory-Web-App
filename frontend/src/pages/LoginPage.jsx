import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Login form container */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
          Kirish
        </h2>

        <form className="space-y-4">
          {/* Foydalanuvchi nomi */}
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
              placeholder="Foydalanuvchi nomi..."
              className="input input-bordered w-full "
            />
          </div>

          {/* Parol */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Parol
            </label>
            <input
              type="password"
              id="password"
              placeholder="Parol..."
              className="input input-bordered w-full bg-sky-50"
            />
          </div>

          {/* Kirish button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

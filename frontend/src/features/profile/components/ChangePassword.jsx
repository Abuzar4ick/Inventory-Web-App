const ChangePassword = () => {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="bg-white w-full max-w-[750px] p-4 sm:p-6 rounded-lg flex flex-col gap-6 shadow-md">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Xavfsizlik</h2>
          <p className="text-gray-600">
            Parolni o'zgartirish va himoya sozlamalari
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Telefon raqami
            </label>
            <input
              type="password"
              placeholder="Eski parolni kiriting"
              className="input input-bordered bg-[#f6f7f9] w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Yangi parol
              </label>
              <input
                type="text"
                placeholder="Yangi parolni kiriting"
                className="input input-bordered bg-[#f6f7f9] w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Parolni tasdiqlang
              </label>
              <input
                type="text"
                placeholder="Parolni qayta kiriting"
                className="input input-bordered bg-[#f6f7f9] w-full"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const MarketInfo = () => {
  const { profile, getProfile } = useAuthStore();

  useEffect(() => {
    if (!profile || profile.length === 0) {
      getProfile();
    }
  }, [profile, getProfile]);

  return (
    <div className="w-full flex justify-center px-4">
      <div className="bg-white w-full max-w-[750px] p-4 sm:p-6 rounded-lg flex flex-col gap-6 shadow-md">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Do'kon ma'lumotlari</h2>
          <p className="text-gray-600">
            Do'koningiz haqidagi ma'lumotlarni yangilang
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Do'kon nomi</label>
            <input
              type="text"
              defaultValue={profile?.name ? profile.name + " Do'koni" : ""}
              className="input input-bordered bg-[#f6f7f9] w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Valyuta</label>
            <input
              type="text"
              defaultValue={"UZS (So'm)"}
              className="input input-bordered bg-[#f6f7f9] w-full"
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarketInfo;

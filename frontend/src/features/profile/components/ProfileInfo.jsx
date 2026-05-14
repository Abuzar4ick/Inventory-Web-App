import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const ProfileInfo = () => {
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
          <h2 className="text-xl font-semibold">Profil ma'lumotlari</h2>
          <p className="text-gray-600">Shaxsiy ma'lumotlarni o'zgartiring</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Ism</label>
              <input
                type="text"
                defaultValue={profile?.name ?? ""}
                className="input input-bordered bg-[#f6f7f9] w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Foydalanuvchi nomi</label>
              <input
                type="text"
                defaultValue={profile?.username ?? ""}
                className="input input-bordered bg-[#f6f7f9] w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Telefon raqami</label>
            <input
              type="tel"
              defaultValue={profile?.phone_number ?? ""}
              placeholder="Telefon raqamingizni kiriting"
              className="input input-bordered bg-[#f6f7f9] w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;

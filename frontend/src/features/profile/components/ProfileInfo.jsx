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
        {/* Reminder: Here will be all profile information */}
        {/* <div className="">{profile && "Hello"}</div> */}
      </div>
    </div>
  );
};

export default ProfileInfo;

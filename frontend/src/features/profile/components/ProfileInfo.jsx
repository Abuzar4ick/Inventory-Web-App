import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
// icons
import { FiLoader } from "react-icons/fi";

const ProfileInfo = () => {
  const { profile, getProfile, updateProfile, isProfileUpdating } = useAuthStore();
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    username: profile?.username || "",
    phone_number: profile?.phone_number || "",
  });

  useEffect(() => {
    if (!profile || profile.length === 0) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name ?? "",
        username: profile.username ?? "",
        phone_number: profile.phone_number ?? "",
      });
    }
  }, [profile]);

  const isDisabled = () =>
    formData.name === profile?.name &&
    formData.username === profile?.username &&
    formData.phone_number === profile?.phone_number;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile(formData).then(() => getProfile());
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="bg-white w-full max-w-[750px] p-4 sm:p-6 rounded-lg flex flex-col gap-6 shadow-md">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Profil ma'lumotlari</h2>
          <p className="text-gray-600">Shaxsiy ma'lumotlarni o'zgartiring</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Ism</label>
              <input
                type="text"
                name="name"
                defaultValue={formData.name}
                className="input input-bordered bg-[#f6f7f9] w-full"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Foydalanuvchi nomi
              </label>
              <input
                type="text"
                name="username"
                defaultValue={formData.username}
                className="input input-bordered bg-[#f6f7f9] w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Telefon raqami
            </label>
            <input
              type="tel"
              name="phone_number"
              defaultValue={formData.phone_number}
              placeholder="Telefon raqamingizni kiriting"
              className="input input-bordered bg-[#f6f7f9] w-full"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary disabled:cursor-pointer"
            disabled={isDisabled() || isProfileUpdating}
          >
            {isProfileUpdating ? (<FiLoader className="animate-spin text-lg" />) : "Saqlash"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;

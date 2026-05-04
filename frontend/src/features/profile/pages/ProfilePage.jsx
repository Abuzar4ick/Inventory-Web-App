// components
import TitleBar from "@/components/layout/TitleBar";
import ProfileInfo from "../components/ProfileInfo";

const ProfilePage = () => {
  return (
    <div className="page-container">
      <TitleBar
        pageTitle={"Profil"}
        pageDescription={"Profil va do'kon ma'lumotlarini boshqaring"}
      />
      <ProfileInfo />
    </div>
  );
};

export default ProfilePage;

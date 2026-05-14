// components
import TitleBar from "@/components/layout/TitleBar";
import ProfileInfo from "../components/ProfileInfo";
import MarketInfo from "../components/MarketInfo";
import ChangePassword from "../components/ChangePassword";

const ProfilePage = () => {
  return (
    <div className="page-container">
      <TitleBar
        pageTitle={"Profil"}
        pageDescription={"Profil va do'kon ma'lumotlarini boshqaring"}
      />
      <ProfileInfo />
      <MarketInfo />
      <ChangePassword />
    </div>
  );
};

export default ProfilePage;

import TitleBar from "../../../components/layout/TitleBar";
import CardStats from "../components/CardStats";
import LawProductsList from "../components/LawProductsList";

function DashboardPage() {
  return (
    <div className="page-container">
      <TitleBar pageTitle={"Boshqaruv paneli"} />
      <CardStats />
      <LawProductsList />
    </div>
  )
}

export default DashboardPage

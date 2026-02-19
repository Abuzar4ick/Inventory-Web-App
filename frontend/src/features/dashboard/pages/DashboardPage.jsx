import TitleBar from "../../../components/layout/TitleBar"
import CardStats from "../components/CardStats";

function DashboardPage() {
  return (
    <div className="page-container">
      <TitleBar pageTitle={"Boshqaruv paneli"} />
      <CardStats />
    </div>
  )
}

export default DashboardPage

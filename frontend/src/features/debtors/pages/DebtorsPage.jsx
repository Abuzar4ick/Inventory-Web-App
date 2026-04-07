import TitleBar from "@/components/layout/TitleBar"
import TotalDebts from "../components/TotalDebts"

const DebtorsPage = () => {
  return (
    <div className="page-container">
      <TitleBar pageTitle="Qarzlar" modalBtnType="add_debtor" />
      <TotalDebts />
    </div>
  )
}

export default DebtorsPage

import TitleBar from "@/components/layout/TitleBar"
import TotalDebts from "../components/TotalDebts"
import DebtsList from "../components/DebtsList"

const DebtorsPage = () => {
  return (
    <div className="page-container">
      <TitleBar pageTitle="Qarzlar" modalBtnType="add_debtor" />
      <TotalDebts />
      <DebtsList />
    </div>
  )
}

export default DebtorsPage

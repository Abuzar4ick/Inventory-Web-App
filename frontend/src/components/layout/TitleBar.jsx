import { useState } from "react";
// components
import { AddModal, AddDebtorModal } from "../ui/Modals";
import AddProduct from "@/features/products/components/modal-forms/AddProduct";
import AddDebt from "@/features/debtors/components/AddDebt";
// icon
import { FiPlus } from "react-icons/fi";

const TitleBar = ({ pageTitle, modalBtnType }) => {
  const [resetKey, setResetKey] = useState(0);

  const handleAddButtonClick = () => {
    if (modalBtnType === "add_product") {
      document.getElementById('add_modal').showModal();
    } else if (modalBtnType === "add_debtor") {
      document.getElementById('add_debtor_modal').showModal();
    }
  };

  const btnText =
    modalBtnType === "add_debtor"
      ? "Qarz qo‘shish"
      : "Mahsulot qo‘shish";

  return (
    <div className="main-container flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">

      <h1 className="text-2xl font-bold">{pageTitle}</h1>

      <button className="btn btn-primary" onClick={handleAddButtonClick}>
        <FiPlus size={16} /> {btnText}
      </button>

      <AddModal onClose={() => setResetKey(prev => prev + 1)}>
        <AddProduct key={resetKey} />
      </AddModal>

      <AddDebtorModal onClose={() => setResetKey(prev => prev + 1)}>
        <AddDebt key={resetKey} />
      </AddDebtorModal>
    </div>
  )
}

export default TitleBar

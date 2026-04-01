import { useState } from "react";
// components
import { AddModal } from "../ui/Modals";
import AddProduct from "../../features/products/components/modal-forms/AddProduct";
// icon
import { FiPlus } from "react-icons/fi";

const TitleBar = ({ pageTitle }) => {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="main-container flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">

      <h1 className="text-2xl font-bold">{pageTitle}</h1>

      <button className="btn btn-primary" onClick={() => document.getElementById('add_modal').showModal()}>
        <FiPlus size={16} /> Mahsulot qo‘shish
      </button>

      <AddModal onClose={() => setResetKey(prev => prev + 1)}>
        <AddProduct key={resetKey} />
      </AddModal>
    </div>
  )
}

export default TitleBar

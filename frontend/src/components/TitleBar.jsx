import AddProduct from "./AddProduct";
import Modal from "./Modal";
// icon
import { FiPlus } from "react-icons/fi";

const TitleBar = ({ pageTitle }) => {
  return (
    <div className="main-container flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">

      <h1 className="text-2xl font-bold">{pageTitle}</h1>

      <button className="btn btn-primary" onClick={() => document.getElementById('my_modal').showModal()}>
        <FiPlus size={16} /> Mahsulot qo‘shish
      </button>

      <Modal>
        <AddProduct />
      </Modal>
    </div>
  )
}

export default TitleBar

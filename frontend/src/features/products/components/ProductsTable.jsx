import { useState } from "react"
// component
import SortBar from "./SortBar";

const ProductsTable = () => {
  const [active, setActive] = useState("all");

  return (
    <div className="main-container bg-white rounded-xl shadow-sm py-8 px-6 flex flex-col gap-6">
      <SortBar active={active} setActive={setActive} />
    </div>
  )
}

export default ProductsTable

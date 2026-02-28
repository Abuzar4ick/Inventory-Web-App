import TitleBar from "../../../components/layout/TitleBar";
import ProductsTable from "../components/ProductsTable";

const ProductsPage = () => {
  return (
    <div className="page-container">
      <TitleBar pageTitle={"Mahsulotlar ro'yxati"} />
      <ProductsTable />
    </div>
  )
}

export default ProductsPage

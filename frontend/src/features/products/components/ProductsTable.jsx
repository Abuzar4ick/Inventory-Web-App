import { useEffect, useState } from "react";
import { useProductStore } from "../../../store/useProductStore";
// components
import SortBar from "./SortBar";
import ProductsTableSkeleton from "./ProductsTableSkeleton";
import UpdateProduct from "./modal-forms/UpdateProduct";
import DeleteProduct from "./modal-forms/DeleteProduct";
import { UpdateModal, DeleteModal } from "../../../components/ui/Modals";
// icons
import { GoPencil } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";

const ProductsTable = () => {
  const [active, setActive] = useState("all");
  const [resetKey, setResetKey] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products, getProducts, areProductsGetting, isDeleting } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // function to determine product status and badge color
  const getStatus = (product) => {
    let status;
    let badgeColor;

    if (product.quantity < product.min_quantity) {
      status = "Tugayapti";
      badgeColor = "bg-red-100 text-red-600";
    } else if (product.quantity <= product.min_quantity * 1.3) {
      status = "Kam";
      badgeColor = "bg-yellow-100 text-yellow-600";
    } else {
      status = "Yetarli";
      badgeColor = "bg-green-100 text-green-600";
    }

    return { status, badgeColor };
  };

  // filter and sort products based on active state
  const processedProducts = (() => {
    let data =
      active === "all"
        ? [...products]
        : products.filter((p) => p.quantity <= p.min_quantity * 1.3);

    return data.sort((a, b) => a.quantity - b.quantity);
  })();

  return (
    <div className="main-container bg-white rounded-xl shadow-sm py-8 px-6 flex flex-col gap-6">
      <SortBar active={active} setActive={setActive} />

      <div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-base-100">
          <table className="table">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th>Mahsulot nomi</th>
                <th className="text-center">Miqdor</th>
                <th className="text-center">Minimal miqdor</th>
                <th className="text-center">Holat</th>
                <th className="text-right">Amallar</th>
              </tr>
            </thead>

            {/* body */}
            <tbody>
              {areProductsGetting ? (
                <ProductsTableSkeleton />
              ) : (
                <>
                  {processedProducts.map((product) => {
                    const { status, badgeColor } = getStatus(product);

                    return (
                      <tr key={product.id} className="hover">
                        <td className="font-medium">{product.name}</td>

                        <td className="text-center">{product.quantity}</td>

                        <td className="text-center">{product.min_quantity}</td>

                        <td className="text-center">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium badge ${badgeColor}`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(product)
                              document.getElementById("update_modal").showModal()
                            }}
                            className="btn btn-sm bg-[#f6f7f9]"
                          >
                            <GoPencil size={16} /> Tahrirlash
                          </button>
                          <button
                            className="btn btn-sm btn-outline btn-error"
                            onClick={() => {
                              setSelectedProduct(product);
                              document.getElementById("delete_modal").showModal();
                            }}
                          >
                            <FiTrash2 size={16} /> O‘chirish
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UpdateModal
        onClose={() => {
          setResetKey((prev) => prev + 1);
          setSelectedProduct(null);
        }}
      >
        {selectedProduct && (
          <UpdateProduct
            key={resetKey}
            product={selectedProduct}
          />
        )}
      </UpdateModal>

      <DeleteModal
        onClose={() => {
          setResetKey((prev) => prev + 1)
          setSelectedProduct(null)
        }}
      >
        {selectedProduct && (
          <DeleteProduct
            key={resetKey}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            isDeleting={isDeleting} />
        )}
      </DeleteModal>
    </div>
  );
};

export default ProductsTable;

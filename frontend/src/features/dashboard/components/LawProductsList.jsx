import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useProductStore } from "../../../store/useProductStore";
// skeleton
import LawProductsListSkeleton from "./skeletons/LawProductsListSkeleton";

const LawProductsList = () => {
  const { products, areProductsGetting, getProducts } = useProductStore();

  useEffect(() => {
    if (products === null) {
      getProducts();
    }
  }, [products, getProducts]);

  const lowStockProducts = products?.filter(
    (product) => product.quantity <= product.min_quantity * 1.3,
  ) ?? [];

  return (
    <div className="main-container bg-white rounded-xl shadow-sm py-8 px-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Kam qolgan mahsulotlar</h1>
        <NavLink to="/products" className="btn btn-outline h-9">Barchasini ko'rish</NavLink>
      </div>
      <div>
        {areProductsGetting ? (
          <LawProductsListSkeleton />
        ) : lowStockProducts.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            Kam qolgan mahsulotlar yo'q.
          </p>
        ) : (
          <ul className="space-y-3">
            {products
              .filter(
                (product) => product.quantity <= product.min_quantity * 1.3,
              )
              .map((product) => {
                let status;
                let dotColor;
                let badgeColor;

                if (product.quantity < product.min_quantity) {
                  // 🔴 Very low (below min)
                  status = "Juda kam";
                  dotColor = "bg-red-500";
                  badgeColor = "bg-red-100 text-red-600";
                } else {
                  // 🟡 Average (equal to or 30% above min)
                  status = "O'rtacha";
                  dotColor = "bg-yellow-500";
                  badgeColor = "bg-yellow-100 text-yellow-600";
                }

                return (
                  <li
                    key={product.id}
                    className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-xl px-5 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 mt-2 rounded-full ${dotColor}`}
                      />

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qoldi: {product.quantity} / Min:{" "}
                          {product.min_quantity}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${badgeColor}`}
                    >
                      {status}
                    </span>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LawProductsList;

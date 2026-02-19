import { useEffect } from "react";
import { useProductStore } from "../../../store/useProductStore"
import CardStatsSkeleton from "./CardStatsSkeleton";
// icons
import { FaBoxOpen } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";

const CardStats = () => {
  const { statistics, areStatsGetting, getProductsStats } = useProductStore();

  useEffect(() => {
    getProductsStats();
  }, [])

  return (
    <div className="main-container">
      {areStatsGetting ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <CardStatsSkeleton key={item} />
          ))}

        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <p className="text-gray-500 text-sm font-bold">
                Jami mahsulotlar
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {statistics.totalProducts}
              </h3>
              <p className="text-gray-400 text-xs">
                Barcha do'kondagi mahsulotlar
              </p>
            </div>
            <div className="text-primary text-2xl">
              <FaBoxOpen />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <p className="text-gray-500 text-sm font-bold">
                Kam qolgan mahsulotlar
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {statistics.lowStockProducts}
              </h3>
              <p className="text-gray-400 text-xs">
                Diqqat talab qiladi
              </p>
            </div>
            <div className="text-orange-400 text-2xl">
              <IoWarningOutline />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <p className="text-gray-500 text-sm font-bold">
                Yangi qo'shilganlar
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {statistics.weeklyAddedProducts}
              </h3>
              <p className="text-gray-400 text-xs">
                Oxirgi 7 kun ichida
              </p>
            </div>
            <div className="text-success text-2xl">
              <TfiStatsUp />
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default CardStats

import { useDebtStore } from "@/store/useDebtStore";
import { useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";

const TotalDebts = () => {
  const { areStatisticsGetting, statistics, getStatistics } = useDebtStore();

  useEffect(() => {
    if (!statistics) {
      getStatistics();
    }
  }, [statistics, getStatistics]);

  return (
    <div className="main-container bg-white border border-gray-200 rounded-2xl p-6 flex items-start justify-between relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-2xl"></div>

      <div>
        <p className="text-gray-500 text-sm mb-2">Jami qarz (to'lanmagan)</p>

        {areStatisticsGetting ? (
          <div className="h-8 w-40 bg-gray-300 animate-pulse rounded"></div>
        ) : (
          <>
            <h3 className="text-3xl font-bold text-gray-900">
              {Number(statistics?.totalAmountOwed || 0).toLocaleString("en-US")}
            </h3>
          </>
        )}
        <span className="text-gray-500 text-sm">UZS</span>
      </div>

      <FiDollarSign className="text-red-500 text-xl mt-1" />
    </div>
  );
};

export default TotalDebts;

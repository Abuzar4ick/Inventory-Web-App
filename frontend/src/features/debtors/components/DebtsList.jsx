import { useEffect } from "react";
import { useDebtStore } from "@/store/useDebtStore";
// icons
import { TiTick } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

const DebtsList = () => {
  const { getAllDebts, debts } = useDebtStore();

  useEffect(() => {
    if (!debts || debts.length === 0) {
      getAllDebts();
    }
  }, [getAllDebts, debts]);
  return (
    <div className="main-container overflow-x-auto rounded-xl border border-gray-200 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>Mijoz</th>
            <th className="text-center">Mahsulot</th>
            <th className="text-center">Miqdor</th>
            <th className="text-center">Summa</th>
            <th className="text-center">Sana</th>
            <th className="text-center">Holat</th>
            <th className="text-end">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt) => (
            <tr
              key={debt.id}
              className={`h-15 transition-colors duration-200 
              ${
                debt.status === "paid"
                  ? "text-[#909295] hover:bg-gray-50"
                  : "bg-[#fef5f5] hover:bg-red-50"
              }`}
            >
              <td className="font-bold">{debt.debtor_name}</td>
              <td className="text-center">{debt.product_name}</td>
              <td className="text-center">{debt.quantity}</td>
              <td className="text-center font-bold">
                {Number(debt?.money_amount || 0).toLocaleString("en-US")} UZS
              </td>
              <td className="text-center">{debt.date}</td>
              <td className="text-center">
                <span
                  className={`badge text-[12px] text-white font-bold ${debt.status === "paid" ? "badge-success" : "badge-error"}`}
                >
                  {debt.status === "paid" ? "To'langan" : "To'lanmagan"}
                </span>
              </td>
              <td className="text-end flex items-center justify-end gap-3">
                {debt.status !== "paid" && (
                  <button
                    className="p-2 rounded-lg bg-green-100 text-green-600 
                  hover:bg-green-200 hover:scale-110 
                    transition-all duration-200"
                  >
                    <TiTick size={16} />
                  </button>
                )}

                <button
                  className="p-2 rounded-lg bg-blue-100 text-blue-600 
                hover:bg-blue-200 hover:scale-110 
                  transition-all duration-200"
                >
                  <FiEdit2 size={16} />
                </button>

                <button
                  className="p-2 rounded-lg bg-red-100 text-red-600 
                hover:bg-red-200 hover:scale-110 
                  transition-all duration-200"
                >
                  <FiTrash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtsList;

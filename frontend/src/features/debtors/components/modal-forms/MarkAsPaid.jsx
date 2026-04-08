import { useDebtStore } from "@/store/useDebtStore";
// icons
import { FiLoader } from "react-icons/fi";

const MarkAsPaid = ({ selectedDebt }) => {
  const { markAsPaid, isMarkingAsPaid: isLoading } = useDebtStore();

  const handleMarkAsPaid = () => {
    if (!selectedDebt) return;
    markAsPaid(selectedDebt.id).then(() => {
      document.getElementById("mark_as_paid_modal")?.close();
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-medium">
        "{selectedDebt?.debtor_name}" mijozning "{selectedDebt?.product_name}"
        mahsuloti uchun qarzni to'langan deb belgilamoqchimisiz?
      </h3>

      <div className="flex justify-end gap-4">
        <button
          className="btn btn-sm"
          onClick={() => document.getElementById("mark_as_paid_modal")?.close()}
        >
          Bekor qilish
        </button>
        <button
          onClick={handleMarkAsPaid}
          disabled={isLoading || !selectedDebt}
          className="btn btn-sm btn-success"
        >
          {isLoading ? (
            <FiLoader className="animate-spin text-lg" />
          ) : (
            "Ha, belgilash"
          )}
        </button>
      </div>
    </div>
  );
};

export default MarkAsPaid;

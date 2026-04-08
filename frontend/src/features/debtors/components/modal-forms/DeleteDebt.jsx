import { useDebtStore } from "@/store/useDebtStore";
// icons
import { FiLoader } from "react-icons/fi";

const DeleteDebt = ({ selectedDebt, isDeleting, setSelectedDebt }) => {
  const { deleteDebt } = useDebtStore();

  const handleDelete = () => {
    if (!selectedDebt) return;
    deleteDebt(selectedDebt.id).then(() => {
      setSelectedDebt(null);
      document.getElementById("delete_debt_modal")?.close();
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-medium">
        "{selectedDebt?.debtor_name}" mijozning "{selectedDebt?.product_name}"
        qarzini haqiqatdan ham o'chirmoqchimisiz?
      </h3>

      <div className="flex justify-end gap-4">
        <button
          className="btn btn-sm"
          onClick={() => document.getElementById("delete_debt_modal")?.close()}
        >
          Bekor qilish
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting || !selectedDebt}
          className="btn btn-sm btn-error"
        >
          {isDeleting ? (
            <FiLoader className="animate-spin text-lg" />
          ) : (
            "O'chirish"
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteDebt;

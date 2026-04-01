import { useProductStore } from "../../../../store/useProductStore";
// icons
import { FiLoader } from "react-icons/fi";

const DeleteProduct = ({ selectedProduct, isDeleting, setSelectedProduct }) => {
  const { deleteProduct } = useProductStore();

  const handleDelete = () => {
    if (!selectedProduct) return;
    deleteProduct(selectedProduct.id).then(() => {
      setSelectedProduct(null);
      document.getElementById("delete_modal")?.close();
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-medium">
        "{selectedProduct?.name}" haqiqatdan ham o‘chirmoqchimisiz?
      </h3>

      <div className="flex justify-end gap-4">
        <button
          className="btn btn-sm"
          onClick={() => document.getElementById("delete_modal")?.close()}
        >
          Bekor qilish
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting || !selectedProduct}
          className="btn btn-sm btn-error"
        >
          {isDeleting ? <FiLoader className="animate-spin text-lg" /> : "O‘chirish"}
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
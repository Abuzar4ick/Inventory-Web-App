import { useState } from "react";
import { useProductStore } from "../../../../store/useProductStore";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { addProduct, isAdding: isLoading } = useProductStore();

  const [data, setData] = useState({
    name: '',
    quantity: "",
    min_quantity: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!data.name || !data.quantity || !data.min_quantity) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    // Create a new product object with the form data
    addProduct({
      name: data.name,
      quantity: Number(data.quantity),
      min_quantity: Number(data.min_quantity)
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="py-2 flex flex-col gap-8 text-center"
    >
      <div className="text-start flex flex-col gap-2">
        <h1 className="font-bold text-xl">Mahsulot qo'shish</h1>

        <p className="text-[#a2a3a4] text-sm">Yangi mahsulot ma'lumotlarini kiriting</p>
      </div>

      <div className="flex flex-col gap-8 text-start text-lg">
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-bold text-sm">Mahsulot nomi</label>
            <input
              type="text"
              placeholder="Mahsulot nomini kiriting"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="input input-bordered w-full bg-[#f6f7f9]"
              required
            />
          </div>

          <div className="relative">
            <label className="font-bold text-sm">Miqdor</label>
            <input
              type="number"
              placeholder="Joriy miqdorni kiriting"
              value={data.quantity}
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
              className="input input-bordered w-full bg-[#f6f7f9]"
              required
            />
          </div>

          <div className="relative">
            <label className="font-bold text-sm">Minimal Miqdor</label>
            <input
              type="number"
              placeholder="Minimal miqdorni kiriting"
              value={data.min_quantity}
              onChange={(e) => setData({ ...data, min_quantity: e.target.value })}
              className="input input-bordered w-full bg-[#f6f7f9]"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            className="btn"
            onClick={() => document.getElementById("add_modal").close()}
          >
            Bekor qilish
          </button>

          <button
            type="submit"
            className="btn btn-primary text-white"
            disabled={isLoading}
          >
            {isLoading ? <FiLoader className="animate-spin text-lg" /> : "Saqlash"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddProduct

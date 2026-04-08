import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { useDebtStore } from "@/store/useDebtStore";

const AddDebt = () => {
  const { addNewDebt, isAdding: isLoading } = useDebtStore();

  const [data, setData] = useState({
    debtor_name: "",
    product_name: "",
    date: "",
    description: "",
    quantity: "1",
    money_amount: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!data.debtor_name || !data.product_name || !data.date || data.quantity <= 0 || data.money_amount <= 0) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring.", {
        position: "bottom-left"
});
      return;
    }

    // Create a new product object with the form data
    addNewDebt(data).then(() => {
      // Close the modal after successful addition
      document.getElementById("add_debtor_modal").close();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="py-2 flex flex-col gap-8 text-center"
    >
      <div className="text-start flex flex-col gap-2">
        <h1 className="font-bold text-xl">Qarz qo'shish</h1>

        <p className="text-[#a2a3a4] text-sm">Yangi qarz ma'lumotlarini kiriting</p>
      </div>

      <div className="flex flex-col gap-8 text-start text-lg">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label className="font-bold text-sm">Mijoz ismi</label>
            <input
              type="text"
              placeholder="Mijoz ismini kiriting"
              value={data.debtor_name}
              onChange={(e) => setData({ ...data, debtor_name: e.target.value })}
              className="input input-bordered w-full bg-[#f6f7f9]"
              required
            />
          </div>

          <div className="relative">
            <label className="font-bold text-sm">Mahsulot</label>
            <input
              type="text"
              placeholder="Mahsulot nomini kiriting"
              value={data.product_name}
              onChange={(e) => setData({ ...data, product_name: e.target.value })}
              className="input input-bordered w-full bg-[#f6f7f9]"
              required
            />
          </div>

          <div className="flex gap-4">
            {/* Amount of products and money */}
            <div className="flex">
              <div className="relative">
                <label className="font-bold text-sm">Miqdor</label>
                <input
                  type="number"
                  value={data.quantity}
                  onChange={(e) => setData({ ...data, quantity: e.target.value })}
                  className="input input-bordered w-full bg-[#f6f7f9]"
                  min={1}
                  required
                />
              </div>
            </div>

            <div className="flex">
              <div className="relative">
                <label className="font-bold text-sm">Narx</label>
                <input
                  type="number"
                  value={data.money_amount}
                  onChange={(e) => setData({ ...data, money_amount: e.target.value })}
                  className="input input-bordered w-full bg-[#f6f7f9]"
                  placeholder="1 mahsulot uchun"
                  min={1}
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-[#f9f9fa] rounded-2xl p-4 border border-gray-300 flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Jami summa</p>
            <h2 className="text-2xl font-bold">
              {data.quantity && data.money_amount
                ? `${(Number(data.quantity) * Number(data.money_amount)).toLocaleString("en-US")} UZS`
                : "0 UZS"}
            </h2>
          </div>

            <div className="relative">
              <label className="font-bold text-sm">Sana (qarz berilgan sana)</label>
              <input
                type="date"
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
                className="input input-bordered w-full bg-[#f6f7f9]"
                required
              />
            </div>

            <div className="relative">
              <label className="font-bold text-sm">Izoh (ixtiyoriy)</label>
              <textarea
                type="text"
                placeholder="Qarz haqida izoh yozing..."
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                className="input input-bordered w-full bg-[#f6f7f9] min-h-[75px] pt-2"
              />
            </div>

        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            className="btn w-[50%]"
            onClick={() => document.getElementById("add_debtor_modal").close()}
          >
            Bekor qilish
          </button>

          <button
            type="submit"
            className="btn btn-primary text-white w-[50%]"
            disabled={isLoading}
          >
            {isLoading ? <FiLoader className="animate-spin text-lg" /> : "Saqlash"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddDebt

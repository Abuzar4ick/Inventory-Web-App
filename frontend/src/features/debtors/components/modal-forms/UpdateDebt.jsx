import { useEffect, useState } from "react";
import { useDebtStore } from "@/store/useDebtStore";
// icons
import { FiLoader } from "react-icons/fi";
// toast
import toast from "react-hot-toast";

const UpdateDebt = ({ debt }) => {
  const { updateDebt, isUpdating: isLoading } = useDebtStore();

  const [data, setData] = useState({
    debtor_name: "",
    product_name: "",
    date: "",
    description: "",
    quantity: "",
    money_amount: "",
  });

  useEffect(() => {
    if (debt) {
      setData({
        debtor_name: debt.debtor_name,
        product_name: debt.product_name,
        date: debt.date,
        description: debt.description || "",
        quantity: debt.quantity,
        money_amount: debt.money_amount,
      });
    }
  }, [debt]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !data.debtor_name ||
      !data.product_name ||
      !data.date ||
      !data.quantity ||
      !data.money_amount
    ) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    // Create a new debt object with the form data
    updateDebt(debt.id, data).then(() => {
      document.getElementById("update_debt_modal").close();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-2 flex flex-col gap-8 text-center"
    >
      <div className="text-start flex flex-col gap-2">
        <h1 className="font-bold text-xl">Qarzni tahrirlash</h1>

        <p className="text-[#a2a3a4] text-sm">
          Qarz ma'lumotlarini o'zgartiring
        </p>
      </div>

      <div className="flex flex-col gap-8 text-start text-lg">
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-bold text-sm">Mijoz ismi</label>
            <input
              type="text"
              placeholder="Mijoz ismini kiriting"
              value={data.debtor_name}
              onChange={(e) =>
                setData({ ...data, debtor_name: e.target.value })
              }
              className="input input-bordered w-full bg-[#f6f7f9]"
              required
            />
          </div>

          <div>
            <label className="font-bold text-sm">Mahsulot nomi</label>
            <input
              type="text"
              placeholder="Mahsulot nomini kiriting"
              value={data.product_name}
              onChange={(e) =>
                setData({ ...data, product_name: e.target.value })
              }
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
                  onChange={(e) =>
                    setData({ ...data, quantity: e.target.value })
                  }
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
                  onChange={(e) =>
                    setData({ ...data, money_amount: e.target.value })
                  }
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

          <div>
            <label className="font-bold text-sm">
              Sana (qarz berilgan sana)
            </label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              className="input input-bordered w-full bg-[#f6f7f9]"
              required
            />
          </div>

          <div>
            <label className="font-bold text-sm">Izoh (ixtiyoriy)</label>
            <textarea
              type="text"
              placeholder="Qarz haqida izoh yozing..."
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className="input input-bordered w-full bg-[#f6f7f9] min-h-[75px] pt-2"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            className="btn"
            onClick={() => document.getElementById("update_debt_modal").close()}
          >
            Bekor qilish
          </button>

          <button
            type="submit"
            className="btn btn-primary text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <FiLoader className="animate-spin text-lg" />
            ) : (
              "Saqlash"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateDebt;

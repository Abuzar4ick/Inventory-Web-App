
const AddProduct = () => {
  return (
    <form
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
              className="input input-bordered w-full bg-[#f6f7f9]"
              required
            />
          </div>

          <div className="relative">
            <label className="font-bold text-sm">Miqdor</label>
            <input
              type="number"
              placeholder="Joriy miqdorni kiriting"
              className="input input-bordered w-full pr-12 bg-[#f6f7f9]"
              required
            />
          </div>

          <div className="relative">
            <label className="font-bold text-sm">Minimal Miqdor</label>
            <input
              type="number"
              placeholder="Minimal miqdorni kiriting"
              className="input input-bordered w-full pr-12 bg-[#f6f7f9]"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-2 ml-auto">
          <form method="dialog">
            <button className="btn">
              Bekor qilish
            </button>
          </form>

          <button
            type="submit"
            className="btn btn-primary text-white"
          >
            Saqlash
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddProduct

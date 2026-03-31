const SortBar = ({ active, setActive }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
      {/* Search input */}
      <label className="input border-gray-200 flex-1 min-w-0 rounded-xl bg-[#f3f4f6] w-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="w-full h-8"
          required
          placeholder="Mahsulot qidirish..."
        />
      </label>

      {/* Switch button */}
      <div className="join bg-[#f3f4f6] p-1 rounded-xl w-full sm:w-auto">
        <button
          className={`join-item btn h-8 rounded-xl border-0 flex-1 sm:flex-none
            ${
              active === "all"
                ? "bg-base-100 shadow-none hover:bg-base-100"
                : "bg-transparent hover:bg-transparent text-[#868b98]"
            }
          `}
          onClick={() => setActive("all")}
        >
          Barchasi
        </button>

        <button
          className={`join-item btn h-8 rounded-xl border-0 flex-1 sm:flex-none
            ${
              active === "few"
                ? "bg-base-100 shadow-none hover:bg-base-100"
                : "bg-transparent hover:bg-transparent text-[#868b98]"
            }
          `}
          onClick={() => setActive("few")}
        >
          Kam qolgan
        </button>
      </div>
    </div>
  );
};

export default SortBar;

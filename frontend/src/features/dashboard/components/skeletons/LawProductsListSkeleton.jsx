const LawProductsListSkeleton = () => {
  return (
    <ul className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <li
          key={index}
          className="flex items-center justify-between bg-white rounded-xl shadow-sm px-5 py-4 animate-pulse"
        >
          <div className="flex items-center gap-3 w-full">
            {/* Dot */}
            <div className="w-2 h-2 mt-2 rounded-full bg-gray-200"></div>

            <div className="flex flex-col gap-2 w-full">
              {/* Product name */}
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>

              {/* Quantity */}
              <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Badge */}
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        </li>
      ))}
    </ul>
  );
};

export default LawProductsListSkeleton;

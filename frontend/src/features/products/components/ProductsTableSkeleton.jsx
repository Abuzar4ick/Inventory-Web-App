
const ProductsListSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <tr key={i}>
          {/* name */}
          <td>
            <div className="skeleton h-4 w-40"></div>
          </td>

          {/* quantity */}
          <td className="text-center">
            <div className="skeleton h-4 w-10 mx-auto"></div>
          </td>

          {/* min quantity */}
          <td className="text-center">
            <div className="skeleton h-4 w-12 mx-auto"></div>
          </td>

          {/* status */}
          <td className="text-center">
            <div className="skeleton h-5 w-20 mx-auto rounded-full"></div>
          </td>

          {/* actions */}
          <td className="flex justify-end gap-2">
            <div className="skeleton h-8 w-24"></div>
            <div className="skeleton h-8 w-24"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ProductsListSkeleton;

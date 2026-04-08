const DebtsListSkeleton = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <tr className="h-15 animate-pulse" key={i}>
        <td>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </td>
        <td className="text-center">
          <div className="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
        </td>
        <td className="text-center">
          <div className="h-4 w-10 bg-gray-200 rounded mx-auto"></div>
        </td>
        <td className="text-center">
          <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>
        </td>
        <td className="text-center">
          <div className="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
        </td>
        <td className="text-center">
          <div className="h-6 w-20 bg-gray-200 rounded mx-auto"></div>
        </td>
        <td className="text-end">
          <div className="flex justify-end gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
        </td>
      </tr>
    ))}
  </>
);

export default DebtsListSkeleton;


const CardStatsSkeleton = (item) => {
    return (
        <div
            key={item}
            className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-start animate-pulse"
        >
            <div className="flex flex-col gap-4 w-full">

                {/* Title */}
                <div className="h-3 w-32 bg-gray-200 rounded"></div>

                {/* Number */}
                <div className="h-10 w-20 bg-gray-300 rounded"></div>

                {/* Subtitle */}
                <div className="h-3 w-40 bg-gray-200 rounded"></div>
            </div>

            {/* Icon placeholder */}
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </div>
    )
}

export default CardStatsSkeleton

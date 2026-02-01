import { FiLoader } from "react-icons/fi";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <FiLoader className="size-10 animate-spin text-black" />
    </div>
  )
}

export default PageLoader
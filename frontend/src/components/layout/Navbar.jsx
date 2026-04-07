import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
// icons
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FiDollarSign } from "react-icons/fi";

const Navbar = () => {
  const { logout } = useAuthStore();

  return (
    <div className="drawer drawer-end bg-[#fbfcfd]">
      {/* Toggle */}
      <input id="mobile-menu" type="checkbox" className="drawer-toggle" />

      {/* PAGE CONTENT */}
      <div className="drawer-content border-b border-gray-200">
        <nav className="navbar main-container">
          {/* LEFT SIDE */}
          <div className="flex-1 flex items-center gap-6">
            <h1 className="text-lg lg:text-xl font-bold">Inventory App</h1>

            {/* Desktop Links */}
            <div className="hidden lg:flex gap-1.5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `btn btn-ghost flex gap-2 ${isActive
                    ? "btn-soft btn-primary"
                    : "text-[#868b98] hover:text-black"
                  }`
                }
              >
                <LuLayoutDashboard size={20} />
                Boshqaruv paneli
              </NavLink>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `btn btn-ghost flex gap-2 ${isActive
                    ? "btn-soft btn-primary"
                    : "text-[#868b98] hover:text-black"
                  }`
                }
              >
                <AiOutlineShoppingCart size={20} />
                Mahsulotlar
              </NavLink>

              <NavLink
                to="/debtors"
                className={({ isActive }) =>
                  `btn btn-ghost flex gap-2 ${isActive
                    ? "btn-soft btn-primary"
                    : "text-[#868b98] hover:text-black"
                  }`
                }
              >
                <FiDollarSign size={20} />
                Qarzlar
              </NavLink>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            {/* Avatar Dropdown (Always stays same) */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-soft btn-primary btn-circle avatar hover:text-white"
              >
                AD
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow border border-gray-300 gap-1"
              >
                <li>
                  <NavLink
                    to="/profile"
                    className="btn btn-ghost btn-primary justify-start text-black hover:text-white"
                  >
                    <FiUser size={20} />
                    Profil
                  </NavLink>
                </li>

                <hr className="text-gray-300" />

                <li>
                  <button
                    onClick={logout}
                    className="btn btn-ghost btn-error justify-start hover:text-white"
                  >
                    <MdLogout size={20} />
                    Chiqish
                  </button>
                </li>
              </ul>
            </div>

            {/* Hamburger (Mobile only) */}
            <label
              htmlFor="mobile-menu"
              className="btn btn-ghost btn-circle hover:btn-primary hover:text-white lg:hidden"
            >
              <FiMenu size={28} />
            </label>
          </div>
        </nav>
      </div>

      {/* DRAWER SIDE MENU */}
      <div className="drawer-side">
        {/* Overlay */}
        <label htmlFor="mobile-menu" className="drawer-overlay"></label>

        {/* Sidebar */}
        <ul className="menu p-4 w-72 min-h-full bg-base-100 gap-2">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Menu</h2>

            {/* Close Button */}
            <label
              htmlFor="mobile-menu"
              className="btn btn-ghost btn-circle active:btn-primary active:text-white"
            >
              <RxCross2 size={20} />
            </label>
          </div>

          {/* Drawer Links with same hover */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `btn btn-ghost justify-start flex gap-2 ${isActive
                  ? "btn-soft btn-primary"
                  : "text-[#868b98] hover:text-black"
                }`
              }
            >
              <LuLayoutDashboard size={20} />
              Boshqaruv paneli
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `btn btn-ghost justify-start flex gap-2 ${isActive
                  ? "btn-soft btn-primary"
                  : "text-[#868b98] hover:text-black"
                }`
              }
            >
              <AiOutlineShoppingCart size={20} />
              Mahsulotlar
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/debtors"
              className={({ isActive }) =>
                `btn btn-ghost justify-start flex gap-2 ${isActive
                  ? "btn-soft btn-primary"
                  : "text-[#868b98] hover:text-black"
                }`
              }
            >
              <FiDollarSign size={20} />
              Qarzlar
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

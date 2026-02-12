import { Outlet, NavLink, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();

  const isSignup = location.pathname.includes("signup");

  return (
    <>
      <nav className="navbar w-[90%] sm:w-[80%] m-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 py-6">
        <h1 className="btn btn-ghost text-xl font-bold text-center sm:text-left">
          Inventory App
        </h1>

        <p className="text-center sm:text-right text-sm sm:text-base">
          {isSignup ? (
            <>
              Allaqachon hisobingiz bormi?{" "}
              <NavLink
                to="/auth/login"
                className="text-primary font-semibold"
              >
                Kirish
              </NavLink>
            </>
          ) : (
            <>
              Hisobingiz yo‘qmi?{" "}
              <NavLink
                to="/auth/signup"
                className="text-primary font-semibold"
              >
                Ro‘yxatdan o‘tish
              </NavLink>
            </>
          )}
        </p>
      </nav>

      <Outlet />
    </>
  );
};

export default AuthLayout;

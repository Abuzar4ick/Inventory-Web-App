import { Outlet, NavLink, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();

  const isSignup = location.pathname.includes("signup");

  return (
    <>
      <nav className="navbar w-[80%] m-auto flex justify-between items-center py-6">
        <h1 className="btn btn-ghost text-2xl font-bold">
          Inventory App
        </h1>

        <p>
          {isSignup ? (
            <>
              Allaqachon hisobingiz bormi?{" "}
              <NavLink to="/auth/login" className="text-primary font-semibold">
                Kirish
              </NavLink>
            </>
          ) : (
            <>
              Hisobingiz yo‘qmi?{" "}
              <NavLink to="/auth/signup" className="text-primary font-semibold">
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

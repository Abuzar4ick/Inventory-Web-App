import { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
// layouts
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
// pages
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ProductsPage from "./features/products/pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import DebtorsPage from "./features/debtors/pages/DebtorsPage";
import HelpPage from "./features/help/pages/HelpPage";
// component
import PageLoader from "./components/common/PageLoader";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: authUser ? <DashboardPage /> : <Navigate to={"/auth/login"} />,
        },
        {
          path: "products",
          element: authUser ? <ProductsPage /> : <Navigate to={"/auth/login"} />,
        },
        {
          path: "profile",
          element: authUser ? <ProfilePage /> : <Navigate to={"/auth/login"} />,
        },
        {
          path: "debtors",
          element: authUser ? <DebtorsPage /> : <Navigate to={"/auth/login"} />,
        },
        {
          path: "help-center",
          element: authUser ? <HelpPage /> : <Navigate to={"/auth/login"} />,
        }
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: authUser ? <Navigate to={"/"} /> : <LoginPage />,
        },
        {
          path: "signup",
          element: authUser ? <Navigate to={"/"} /> : <SignupPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;

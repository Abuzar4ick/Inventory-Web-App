import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
// layouts
import RootLayout from "./layouts/RootLayout";
// pages
import HomePage from "./pages/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        }
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App

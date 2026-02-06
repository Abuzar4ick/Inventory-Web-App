import { Outlet } from "react-router-dom";
// components
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <div className="min-h-screen text-black">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>{/* There might be footer :) */}</footer>
    </div>
  );
}

export default RootLayout;

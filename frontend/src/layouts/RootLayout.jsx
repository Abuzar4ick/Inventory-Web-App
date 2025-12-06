import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header>{/* There will be navbar */}</header>
      <main>
        <Outlet />
      </main>
      <footer>{/* There might be footer :) */}</footer>
    </div>
  );
}

export default RootLayout;

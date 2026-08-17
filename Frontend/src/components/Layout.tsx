import type { FC } from "react";
import { Outlet } from "react-router";

import Navbar from "@features/Navbar";
import Sidebar from "@features/Sidebar";

const Layout: FC = () => {
  return (
    <div className="h-[100vh]">
      <Navbar />

      <main className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

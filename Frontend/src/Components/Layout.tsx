import type { FC } from "react";
import Sidebar from "../Ui/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../Ui/Navbar";

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

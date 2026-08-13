import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeSidebar, openSidebar } from "../../app/slices/uiSlice";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

const Sidebar: FC = () => {
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  return (
    <aside
      className={`w-${sidebarOpen ? 64 : 14} bg-gray-50 px-4 py-2 transition-[width] duration-500 ease-in-out`}
    >
      <div className="flex justify-between">
        {sidebarOpen ? <p>Live Channels</p> : null}
        <button
          onClick={() => {
            dispatch((sidebarOpen ? closeSidebar : openSidebar)());
          }}
        >
          {sidebarOpen ? <BiArrowFromRight /> : <BiArrowFromLeft />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

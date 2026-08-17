import { useState, type FC } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { closeSidebar, openSidebar } from "@store/slices/uiSlice";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import FollowedChannels from "./components/FollowedChannels";
import SidebarContainer from "./components/SidebarContainer";

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const { isAuth } = useAppSelector((state) => state.auth);

  const [orderedBase, setOrderedBase] = useState<"views" | "recommended">(
    "views",
  );

  return (
    <aside
      style={{ width: `calc(${sidebarOpen ? 58 : 12} * 0.25rem)` }}
      className={`bg-gray-50 py-2 transition-[width] duration-500 ease-in-out`}
    >
      <SidebarContainer>
        <div
          style={{ justifyContent: sidebarOpen ? "space-between" : "center" }}
          className="flex"
        >
          {sidebarOpen ? <p>For You</p> : null}
          <button
            className="flex items-center justify-center bg-yellow-300"
            onClick={() => {
              dispatch((sidebarOpen ? closeSidebar : openSidebar)());
            }}
          >
            {sidebarOpen ? <BiArrowFromRight /> : <BiArrowFromLeft />}
          </button>
        </div>
      </SidebarContainer>
      {isAuth && <FollowedChannels />}
    </aside>
  );
};

export default Sidebar;

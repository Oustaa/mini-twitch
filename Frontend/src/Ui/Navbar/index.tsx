import { Menu } from "@kousta-ui/components";
import type { FC } from "react";
import Search from "../../Components/Search";
import Auth from "../../Components/Auth";
import { Link } from "react-router";

import { BiSolidDashboard } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaChalkboardUser, FaTwitch } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { useAppSelector } from "../../app/hooks";

const ICON_SIZE = 20;

const Navbar: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <>
      <nav className="flex bg-white shadow-sm h-[3.5rem] gap-4 items-center justify-between p-2">
        <div className="flex items-center space-x-8">
          <div className="w-12 flex justify-center items-center">
            <Link to={"/"}>
              <FaTwitch size={22} style={{ color: "var(--kui-primary-400)" }} />
            </Link>
          </div>
          {isAuth && <Link to={"following"}>Following</Link>}
          <Link to={"browse"}>Browse</Link>
        </div>
        <Search />
        <div className="flex gap-2 items-center">
          <Auth />
          <Menu.Menu position="Bottom-End">
            <Menu.Target>
              <div className="w-10 aspect-square rounded-full flex items-center justify-center">
                <LuUser color="black" size={22} />
              </div>
            </Menu.Target>
            <Menu.DropDown>
              <Menu.Item leftSection={<FaChalkboardUser size={ICON_SIZE} />}>
                <span>Channel</span>
              </Menu.Item>
              <Menu.Item leftSection={<BiSolidDashboard size={ICON_SIZE} />}>
                <span>Creatore Dashboard</span>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<MdOutlineSpaceDashboard size={ICON_SIZE} />}
              >
                Creatore Dashboard
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<IoIosSettings size={ICON_SIZE} />}>
                Settings
              </Menu.Item>
            </Menu.DropDown>
          </Menu.Menu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

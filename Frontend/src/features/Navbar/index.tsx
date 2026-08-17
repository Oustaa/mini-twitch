import { Menu } from "@kousta-ui/components";
import type { FC } from "react";
import Search from "@components/Search";
import Auth from "@features/Auth";
import { Link } from "react-router";

import { BiSolidDashboard } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaChalkboardUser, FaTwitch } from "react-icons/fa6";
import { useAppSelector } from "@store/hooks";
import { useGetAuthUser } from "@hooks/auth";
import { RiLogoutBoxLine } from "react-icons/ri";
import UserAvatar from "@components/UserAvatar";
import { useLogout } from "../Auth/hooks";

const ICON_SIZE = 20;

const Navbar: FC = () => {
  const { loading: logingOut, logout } = useLogout();
  const { isAuth } = useAppSelector((state) => state.auth);
  const user = useGetAuthUser();

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
          {!isAuth && <Auth />}
          <Menu.Menu position="Bottom-End">
            <Menu.Target>
              <UserAvatar user={user} />
            </Menu.Target>
            {isAuth ? (
              <Menu.DropDown>
                <Menu.Item>
                  <div className="flex items-center gap-2">
                    <UserAvatar user={user} />
                    <span className="text-md font-bold">{user.username}</span>
                  </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<FaChalkboardUser size={ICON_SIZE} />}>
                  <span>Channel</span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  onClick={logout}
                  leftSection={<RiLogoutBoxLine size={ICON_SIZE} />}
                  disabled={logingOut}
                >
                  {logingOut ? "Loging out" : "Log Out"}
                </Menu.Item>
              </Menu.DropDown>
            ) : (
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
            )}
          </Menu.Menu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

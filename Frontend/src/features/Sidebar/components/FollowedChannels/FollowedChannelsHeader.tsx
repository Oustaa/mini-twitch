import SidebarContainer from "../SidebarContainer";
import { useAppSelector } from "@/store/hooks";
import { Menu } from "@kousta-ui/components";
import { BiSortAlt2 } from "react-icons/bi";
import { FaSortAmountDown } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";

const FollowedChannelsHeader = () => {
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  if (!sidebarOpen)
    return (
      <div className="mt-3 flex justify-center py-2">
        <FaRegHeart size={18} />
      </div>
    );

  return (
    <Menu.Menu position="Bottom-Center">
      <Menu.Target>
        <div className="hover:bg-gray-200">
          <SidebarContainer>
            <div className="flex items-center justify-between p-2 flex-1 w-full">
              <div className="space-y-1">
                <h3 className="text-md">Followed Channels</h3>
                <p className="text-xs text-gray-600">
                  {" "}
                  Viewers ( High to Low )
                </p>
              </div>
              <BiSortAlt2 size={24} />
            </div>
          </SidebarContainer>
        </div>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item leftSection={<GoStarFill />}>Recommended For You</Menu.Item>
        <Menu.Item leftSection={<FaSortAmountDown />}>
          Viewers ( High to Low )
        </Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
};

export default FollowedChannelsHeader;

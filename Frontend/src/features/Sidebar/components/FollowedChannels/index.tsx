import { followedChannels } from "../../data";
import SidebarChannelList from "../SidebarChannelList";
import SidebarContainer from "../SidebarContainer";
import FollowedChannelsHeader from "./FollowedChannelsHeader";

const FollowedChannels = () => {
  return (
    <>
      <FollowedChannelsHeader />
      <SidebarContainer>
        <SidebarChannelList channels={followedChannels} />
      </SidebarContainer>
    </>
  );
};

export default FollowedChannels;

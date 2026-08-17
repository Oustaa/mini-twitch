import type { FC } from "react";
import type { ChannelData } from "../types";
import { useAppSelector } from "@/store/hooks";

import ChannelItem from "./ChannelItem";
import ClosedChannelItem from "./ClosedChannelItem";

const SidebarChannelList: FC<{ channels: ChannelData[] }> = ({ channels }) => {
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  return (
    <div className="space-y-3">
      {channels.map((channel) => {
        if (sidebarOpen)
          return <ChannelItem key={channel.username} channel={channel} />;
        return <ClosedChannelItem key={channel.username} channel={channel} />;
      })}
    </div>
  );
};

export default SidebarChannelList;

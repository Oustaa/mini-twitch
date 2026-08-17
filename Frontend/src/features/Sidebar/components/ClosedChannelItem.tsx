import type { FC } from "react";
import type { ChannelData } from "../types";
import UserAvatar from "@/components/UserAvatar";
import { Link } from "react-router";

const ClosedChannelItem: FC<{ channel: ChannelData }> = ({ channel }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });

  const isOffline = !Number(channel.total_views);

  return (
    <Link to={""} className="group flex gap-1 justify-between relative">
      <div className="relative">
        {isOffline && (
          <div className="absolute inset-0 bg-gray-300/50 rounded-full" />
        )}
        <UserAvatar user={channel} width={28} />
      </div>
      {!isOffline && (
        <div className="absolute hidden group-hover:block right-0 bg-gray-100 p-2 rounded-sm translate-x-[calc(100%+1rem)] min-w-54 space-y-1">
          <div className="flex items-center text-xs gap-2 text-violet-600 w-max">
            <p>{channel.username}</p>
            <div className="w-0.5 aspect-square rounded-full bg-violet-600" />
            <p>{channel.category}</p>
          </div>
          <p className="text-xs text-gray-800 line-clamp-2">
            {channel.live_title}
          </p>
          <div className="flex items-center gap-1">
            <div className="w-2 aspect-square rounded-full bg-rose-700" />
            <p className="text-xs text-gray-700">
              Live | {formatter.format(channel.total_views)} viewrs
            </p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ClosedChannelItem;

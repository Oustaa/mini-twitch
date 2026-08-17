import type { FC } from "react";
import type { ChannelData } from "../types";
import UserAvatar from "@/components/UserAvatar";
import { Link } from "react-router";

const ChannelItem: FC<{ channel: ChannelData }> = ({ channel }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });

  const isOffline = !Number(channel.total_views);

  return (
    <Link to={""} className="group flex gap-2 justify-between relative">
      <div className="flex gap-2 items-center">
        <div className="relative">
          {isOffline && (
            <div className="absolute inset-0 bg-gray-300/50 rounded-full" />
          )}
          <UserAvatar user={channel} width={28} />
        </div>
        <div>
          <h4 className="text-sm text-black line-clamp-1">
            {channel.username}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-1">
            {channel.category}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm">
        {isOffline ? (
          <p>Offline</p>
        ) : (
          <>
            <div className="w-2 aspect-square rounded-full bg-red-500" />
            <p>{formatter.format(channel.total_views)}</p>
          </>
        )}
      </div>
      {!isOffline && (
        <div className="absolute hidden group-hover:block right-0 bg-gray-100 p-2 rounded-sm translate-x-[calc(100%+1rem)]">
          <p className="text-xs text-gray-800 line-clamp-2">
            {channel.live_title}
          </p>
        </div>
      )}
    </Link>
  );
};

export default ChannelItem;

import type { FC } from "react";
import { LuUser } from "react-icons/lu";

const UserAvatar: FC<{
  user?: { avatar?: string; username?: string };
  width?: string | number;
}> = ({ user, width }) => {
  const avatarWidth = width
    ? typeof width === "number"
      ? `${width}px`
      : width
    : "32px";

  if (!user)
    return (
      <div
        style={{ width: avatarWidth }}
        className="aspect-square rounded-full flex items-center justify-center"
      >
        <LuUser color="black" size={20} />
      </div>
    );

  return (
    <div style={{ width: avatarWidth }}>
      {user.avatar ? (
        <div className="rounded-full overflow-hidden aspect-square">
          <img src={user.avatar} alt={`${user.username}`} className="w-full" />
        </div>
      ) : (
        <div
          style={{ width: avatarWidth }}
          className="bg-teal-400 aspect-square rounded-full flex items-center justify-center"
        >
          <LuUser color="black" size={20} />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;

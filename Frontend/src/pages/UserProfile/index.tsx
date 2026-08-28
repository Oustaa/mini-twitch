import type { FC } from "react";
import { useParams } from "react-router";

const UserProfile: FC = () => {
  const { username } = useParams();

  return <>{username}</>;
};

export default UserProfile;

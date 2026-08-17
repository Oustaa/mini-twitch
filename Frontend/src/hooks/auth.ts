import { useAppSelector } from "@store/hooks";
import type { AuthUser } from "@types/auth";

export const useGetAuthUser = (): AuthUser => {
  const user = useAppSelector((state) => state.auth.user);

  return user;
};

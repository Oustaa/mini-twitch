import { useAppDispatch } from "@/store/hooks";
import { api } from "@/utils/ApiInstance";
import { useCallback, useState } from "react";
import { logout as logoutFunc } from "./authSlice";

export function useLogout() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post("/auth/logout");

      if (response.status === 200) {
        dispatch(logoutFunc());
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    logout,
    loading,
  };
}

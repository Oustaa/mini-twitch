import { useEffect, type FC, type PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { openAuthModal } from "@store/slices/uiSlice";
import PageNoteFound from "./PageNotFound";

const ProtectedRoutes: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  if (isAuth) {
    return children;
  }

  useEffect(() => {
    dispatch(openAuthModal("login"));
  }, []);

  return <PageNoteFound message="You must be logged in to view this page" />;
};

export default ProtectedRoutes;

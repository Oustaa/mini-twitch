import { useEffect, type FC, type PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { openAuthModal } from "../app/slices/uiSlice";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  if (isAuth) {
    return children;
  }

  useEffect(() => {
    dispatch(openAuthModal("login"));
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full flex-1">
      <p>You must be logged in to view this page</p>
    </div>
  );
};

export default AuthLayout;

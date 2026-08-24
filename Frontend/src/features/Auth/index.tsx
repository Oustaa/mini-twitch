import { type FC } from "react";

import { Button, Modal } from "@kousta-ui/components";
import Login from "./components/login";
import SignUp from "./components/signup";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { closeAuthModal, openAuthModal } from "@store/slices/uiSlice";

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const { authModal, authMode } = useAppSelector((state) => state.ui);

  return (
    <>
      <Modal
        opened={authModal}
        onClose={() => {
          dispatch(closeAuthModal());
        }}
        title={authMode === "login" ? "Log in" : "Sign in"}
        size="xs"
        position="top"
        offset={100}
        closeOnClickOutside={false}
        closeOnClickEsc={false}
      >
        {authMode === "login" ? <Login /> : <SignUp />}
      </Modal>

      <Button
        variant="neutral"
        style={{ borderRadius: 4000 }}
        onClick={() => {
          dispatch(openAuthModal("login"));
        }}
        size="sm"
      >
        Login
      </Button>
      <Button
        variant="primary"
        style={{ borderRadius: 4000 }}
        onClick={() => {
          dispatch(openAuthModal("signup"));
        }}
        size="sm"
      >
        Sign in
      </Button>
    </>
  );
};

export default Auth;

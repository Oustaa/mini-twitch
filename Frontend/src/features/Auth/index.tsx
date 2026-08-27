import { type FC, type ReactNode } from "react";

import { Button, Modal } from "@kousta-ui/components";
import Login from "./components/login";
import SignUp from "./components/signup";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  closeAuthModal,
  openAuthModal,
  type AuthMode,
} from "@store/slices/uiSlice";
import SignupSuccess from "./components/signupSuccess";

const titleByMode: Record<AuthMode, string> = {
  login: "Log in",
  signedup: "One Step Away",
  signup: "Join Us today",
};

const modeToComp: Record<AuthMode, ReactNode> = {
  login: <Login />,
  signedup: <SignupSuccess />,
  signup: <SignUp />,
} as const;

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const { authModal, authMode } = useAppSelector((state) => state.ui);

  return (
    <>
      <Modal
        opened={authModal}
        onClose={() => dispatch(closeAuthModal())}
        title={authMode ? titleByMode[authMode] : ""}
        size="xs"
        position="top"
        offset={100}
        closeOnClickOutside={false}
        closeOnClickEsc={false}
      >
        {/* @ts-expect-error this is not an error */}
        {authMode && modeToComp[authMode]}
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

import { useState, type FC } from "react";

import { Button, Modal } from "@kousta-ui/components";
import { useDisclosure } from "@kousta-ui/hooks";
import Login from "./login";
import Signin from "./signin";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeAuthModal, openAuthModal } from "../../app/slices/uiSlice";

export type FormType = "login" | "signin";

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
        {authMode === "login" ? <Login /> : <Signin />}
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
          dispatch(openAuthModal("signin"));
        }}
        size="sm"
      >
        Sign in
      </Button>
    </>
  );
};

export default Auth;

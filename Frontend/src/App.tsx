import { ComponentPropsProvider } from "@kousta-ui/components";
import { Route, Routes } from "react-router";

import Layout from "@components/Layout";

import Home from "@pages/Home";
import Browse from "@pages/Browse";
import Following from "@pages/Following";

import { BsX } from "react-icons/bs";
import { useEffect } from "react";
import { api } from "@utils/ApiInstance";
import { useAppDispatch } from "@store/hooks";
import { login } from "@features/Auth/authSlice";
import type { AuthUser } from "@types/auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PageNoteFound from "./components/PageNotFound";

async function verifyAuth(successCB: (user: AuthUser) => void) {
  try {
    const responce = await api.post("/auth/verify");

    const user = responce.data;

    if (responce.status === 200) {
      successCB(user);
    }
  } catch (error) {}
}

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    verifyAuth((user: AuthUser) => {
      dispatch(login({ user }));
    });
  }, []);

  return (
    <ComponentPropsProvider
      modal={{ closeIcon: <BsX size={18} /> }}
      button={{}}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route
            path="/following"
            element={
              <ProtectedRoutes>
                <Following />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<PageNoteFound />} />
        </Route>
      </Routes>
    </ComponentPropsProvider>
  );
}

export default App;

import { ComponentPropsProvider } from "@kousta-ui/components";
import { Route, Routes } from "react-router";

import Layout from "./Components/Layout";
import AuthLayout from "./Components/AuthLayout";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Following from "./pages/Following";

import { BsX } from "react-icons/bs";

function App() {
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
              <AuthLayout>
                <Following />
              </AuthLayout>
            }
          />
        </Route>
      </Routes>
    </ComponentPropsProvider>
  );
}

export default App;

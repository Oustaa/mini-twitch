import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "./app/store.ts";

import "./main.css";
import "@kousta-ui/components/esm/index.css";
import "@kousta-ui/table/esm/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>,
);

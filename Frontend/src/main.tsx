import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.tsx";

fetch("http://localhost:4001/users")
  .then((resp) => {
    console.log(resp);
    return resp.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch(console.error);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

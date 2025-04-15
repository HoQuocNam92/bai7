import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@styles/main.scss";
import App from "./App.tsx";
import { ScrollRestoration } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// @ts-ignore No types necessary
import "@fontsource/inter";

import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./lib/Theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import SettingsProvider from "./providers/SettingsProvider.jsx";

import "./index.css";
import "./globals.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <App className="app" />
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>,
);

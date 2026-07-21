import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import MessageProvider from "./providers/MessageProvider.jsx";
import SettingsProvider from "./providers/SettingsProvider.jsx";

import "./index.css";
import "./globals.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MessageProvider>
        <SettingsProvider>
          <App className="app" />
        </SettingsProvider>
      </MessageProvider>
    </BrowserRouter>
  </StrictMode>,
);

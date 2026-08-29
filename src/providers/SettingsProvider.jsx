import { useContext, createContext, useEffect, useState } from "react";

import { getSettings, saveSettings } from "../utils/storage";

import MessageDisplay from "../components/MessageDisplay/MessageDisplay.jsx";

const SettingsContext = createContext(null);
export default function SettingsProvider({ children }) {
  const settingsTemplate = {
    colourScheme: "default",
    darkMode: true,
    font: "default",
    keyboard: true,
    switchKeys: false,
  };

  const [settings, setSettings] = useState({
    ...settingsTemplate,
    ...getSettings(),
  });

  useEffect(() => {
    applySettings();
    saveSettings(settings);
  }, [settings]);

  const applySettings = () => {
    const root = document.documentElement;
    root.dataset.colourScheme = settings.colourScheme;
    root.dataset.darkMode = String(settings.darkMode);
    console.log(String(settings.darkMode));
    root.dataset.font = settings.font;
  };

  const settingsData = { settings, setSettings };

  return (
    <SettingsContext.Provider value={settingsData}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

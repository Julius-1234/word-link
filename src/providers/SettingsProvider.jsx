import { useContext, createContext, useEffect, useState } from "react";

import { getSettings, saveSettings } from "../utils/storage";

import MessageDisplay from "../components/MessageDisplay/MessageDisplay.jsx";

const SettingsContext = createContext(null);
export default function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(
    getSettings() || { styles: {}, other: {} },
  );

  useEffect(() => {
    applyStyles();
    saveSettings(settings);
  }, [settings]);

  const applyStyles = () => {
    for (const key in settings.styles) {
      document.documentElement.dataset[key] = settings.styles[key];
    }
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

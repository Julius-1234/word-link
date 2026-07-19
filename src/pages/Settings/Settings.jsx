import HomeLink from "../../components/HomeLink/HomeLink";
import styles from "./Settings.module.scss";
import { useSettings } from "../../providers/SettingsProvider";
import { settingsInfo, symbols } from "../../utils/constants";
export default function Settings() {
  const settings = useSettings();

  const colourThemes = settingsInfo.themes;
  const fonts = settingsInfo.fonts;

  const setSetting = (key, value, style = true) =>
    settings.setSettings((prev) => {
      return {
        ...prev,
        [style ? "styles" : "other"]: {
          ...prev[style ? "styles" : "other"],
          [key]: value,
        },
      };
    });

  return (
    <div>
      <HomeLink />
      <div className={styles.settings}>
        <br />
        Colour Theme:
        <div className={styles.colourTheme}>
          {colourThemes.map((theme, i) => {
            return (
              <label key={i} data-colour-scheme={theme}>
                <input
                  type="radio"
                  name="colourTheme"
                  value={theme}
                  checked={
                    (settings.settings.styles.colourScheme || "default") ===
                    theme
                  }
                  onChange={(e) => setSetting("colourScheme", theme)}
                />
                <div className={styles.colourThemePreview}>{theme}</div>
              </label>
            );
          })}
        </div>
        <br />
        Dark Mode:
        <div className={styles.darkMode}>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setSetting("darkMode", e.target.checked)}
              checked={settings.settings.styles.darkMode ?? true}
            ></input>
          </label>
        </div>
        <br />
        Font:
        <div className={styles.fonts}>
          {fonts.map((font, i) => {
            return (
              <label key={i} data-font={font}>
                <input
                  type="radio"
                  name="font"
                  value={font}
                  checked={
                    (settings.settings.styles.font || "default") === font
                  }
                  onChange={(e) => setSetting("font", font)}
                />
                <div className={styles.fontPreview}>{font}</div>
              </label>
            );
          })}
        </div>
        <br />
        On-screen keyboard:
        <div className={styles.keyboard}>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setSetting("keyboard", e.target.checked, false)}
              checked={settings.settings.other.keyboard ?? true}
            ></input>
          </label>
        </div>
        <br />
        Switch Backspace ({symbols.keyBack}) and Enter ({symbols.keyEnter}) on
        on-screen keyboard:
        <div className={styles.switchKeys}>
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                setSetting("switchKeys", e.target.checked, false)
              }
              checked={settings.settings.other.switchKeys ?? false}
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
}

import HomeLink from "../../components/HomeLink/HomeLink";
import styles from "./Settings.module.scss";
import { useSettings } from "../../providers/SettingsProvider";
import { settingsInfo, symbols } from "../../utils/constants";
export default function Settings() {
  const settings = useSettings();

  const colourThemes = settingsInfo.themes;
  const fonts = settingsInfo.fonts;

  const setSetting = (key, value) =>
    settings.setSettings((prev) => {
      return { ...prev, [key]: value };
    });

  return (
    <div>
      <HomeLink />
      <div className={styles.settings}>
        <br />
        Colour Theme:
        <div className={styles.radioSetting}>
          {colourThemes.map((theme, i) => {
            return (
              <label key={i} data-colour-scheme={theme}>
                <input
                  type="radio"
                  name="colourTheme"
                  value={theme}
                  checked={settings.settings.colourScheme === theme}
                  onChange={(e) => setSetting("colourScheme", theme)}
                />
                <div className={styles.radioPreview}>{theme}</div>
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
              checked={settings.settings.darkMode}
            ></input>
          </label>
        </div>
        <br />
        Font:
        <div className={styles.radioSetting}>
          {fonts.map((font, i) => {
            return (
              <label key={i} data-font={font}>
                <input
                  type="radio"
                  name="font"
                  value={font}
                  checked={settings.settings.font === font}
                  onChange={(e) => setSetting("font", font)}
                />
                <div className={styles.radioPreview}>{font}</div>
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
              onChange={(e) => setSetting("keyboard", e.target.checked)}
              checked={settings.settings.keyboard}
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
              onChange={(e) => setSetting("switchKeys", e.target.checked)}
              checked={settings.settings.switchKeys}
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
}

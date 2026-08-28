import styles from "./Keyboard.module.scss";
import { symbols } from "../../utils/constants";
import { useSettings } from "../../providers/SettingsProvider";
import Btn from "../Btn/Btn.jsx";
import { useGame } from "../../game/GameEngine.jsx";

export default function Keyboard() {
  const { settings } = useSettings();
  const { keyHandler } = useGame();
  const row = (keys) => {
    return keys.split("").map((key, i) => {
      if (key === " ")
        return <div key={i} className={styles.keyboardGap}></div>;
      return (
        <Btn
          key={key}
          onMouseDown={() => {
            keyHandler(key);
          }}
        >
          {key}
        </Btn>
      );
    });
  };

  const back = (
    <Btn
      className={styles.keyboardBig}
      onMouseDown={() => {
        keyHandler("backspace");
      }}
    >
      {symbols.keyBack}
    </Btn>
  );

  const enter = (
    <Btn
      className={styles.keyboardBig}
      onMouseDown={() => {
        keyHandler("enter");
      }}
    >
      {symbols.keyEnter}
    </Btn>
  );

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>{row("qwertyuiop")}</div>
      <div className={styles.keyboardRow}>{row(" asdfghjkl ")}</div>
      <div className={styles.keyboardRow}>
        {!settings.other.switchKeys ? back : enter}
        {row("zxcvbnm")}
        {!settings.other.switchKeys ? enter : back}
      </div>
    </div>
  );
}

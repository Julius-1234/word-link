import styles from "./Keyboard.module.scss";
import { symbols } from "../../utils/constants";
import { useSettings } from "../../providers/SettingsProvider";
import Btn from "../Btn/Btn.jsx";

export default function Keyboard({ onInput }) {
  const { settings } = useSettings();
  const row = (keys) => {
    return keys.split("").map((key, i) => {
      if (key === " ")
        return <div key={i} className={styles.keyboardGap}></div>;
      return (
        <Btn
          key={key}
          onMouseDown={() => {
            onInput(key);
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
        onInput("backspace");
      }}
    >
      {symbols.keyBack}
    </Btn>
  );

  const enter = (
    <Btn
      className={styles.keyboardBig}
      onMouseDown={() => {
        onInput("enter");
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

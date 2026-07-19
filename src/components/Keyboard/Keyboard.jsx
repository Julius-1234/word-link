import styles from "./Keyboard.module.scss";
import { symbols } from "../../utils/constants";
import { useSettings } from "../../providers/SettingsProvider";

export default function Keyboard({ onInput }) {
  const { settings } = useSettings();
  const row = (keys) => {
    return keys.split("").map((key, i) => {
      if (key === " ")
        return <div key={i} className={styles.keyboardGap}></div>;
      return (
        <button
          key={key}
          onMouseDown={() => {
            onInput(key);
          }}
        >
          {key}
        </button>
      );
    });
  };

  const back = (
    <button
      className={styles.keyboardBig}
      onMouseDown={() => {
        onInput("backspace");
      }}
    >
      {symbols.keyBack}
    </button>
  );

  const enter = (
    <button
      className={styles.keyboardBig}
      onMouseDown={() => {
        onInput("enter");
      }}
    >
      {symbols.keyEnter}
    </button>
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

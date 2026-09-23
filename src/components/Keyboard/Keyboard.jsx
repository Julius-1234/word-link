import styles from "./Keyboard.module.scss";
import { symbols } from "../../utils/constants";
import { useSettings } from "../../providers/SettingsProvider";
import Btn from "../Btn/Btn.jsx";
import { useGame } from "../../game/GameEngine.jsx";

export default function Keyboard() {
  const { settings } = useSettings();
  const { keyHandler } = useGame();

  const Key = ({ value, mapKey, handler, className }) => {
    return (
      <Btn key={mapKey} onMouseDown={handler} className={className}>
        {value}
      </Btn>
    );
  };

  const Row = (keys) => {
    return keys.split("").map((value, i) => {
      if (value === " ")
        return <Key i={i} className={styles.keyboardGap}></Key>;
      return (
        <Key
          makeKey={value}
          handler={() => {
            keyHandler(value);
          }}
          value={value}
        />
      );
    });
  };

  const back = (
    <Key
      className={styles.keyboardBig}
      handler={() => {
        keyHandler("backspace");
      }}
      value={symbols.keyBack}
    />
  );

  const enter = (
    <Key
      className={styles.keyboardBig}
      handler={() => {
        keyHandler("enter");
      }}
      value={symbols.keyEnter}
    />
  );

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>{Row("qwertyuiop")}</div>
      <div className={styles.keyboardRow}>{Row(" asdfghjkl ")}</div>
      <div className={styles.keyboardRow}>
        {!settings.switchKeys ? back : enter}
        {Row("zxcvbnm")}
        {!settings.switchKeys ? enter : back}
      </div>
    </div>
  );
}

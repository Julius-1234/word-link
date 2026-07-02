import styles from "./Keyboard.module.scss";

export default function Keyboard({ onInput }) {
  const row = (keys) => {
    return keys.split("").map((key, i) => {
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

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>{row("qwertyuiop")}</div>
      <div className={styles.keyboardRow}>{row("asdfghjkl")}</div>
      <div className={styles.keyboardRow}>
        <button
          className={styles.keyboardBig}
          onMouseDown={() => {
            onInput("backspace");
          }}
        >
          &#x232B;
        </button>
        {row("zxcvbnm")}
        <button
          className={styles.keyboardBig}
          onMouseDown={() => {
            onInput("enter");
          }}
        >
          &#x23CE;
        </button>
      </div>
    </div>
  );
}

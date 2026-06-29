import "./Keyboard.css";

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
    <div className="keyboard">
      <div className="keyboard-row">{row("qwertyuiop")}</div>
      <div className="keyboard-row">{row("asdfghjkl")}</div>
      <div className="keyboard-row">
        <button
          className="key-board-big"
          onMouseDown={() => {
            onInput("backspace");
          }}
        >
          &#x232B;
        </button>
        {row("zxcvbnm")}
        <button
          className="key-board-big"
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

import "./Keyboard.css";

export default function Keyboard() {
  const row = (keys) => {
    return keys.split("").map((key, i) => {
      return <button key={key}>{key}</button>;
    });
  };

  return (
    <div className="keyboard">
      <div className="keyboard-row">{row("qwertyuiop")}</div>
      <div className="keyboard-row">{row("asdfghjkl")}</div>
      <div className="keyboard-row">
        <button key="backspace">&#x232B;</button>
        {row("zxcvbnm")}
        <button key="enter">&#x23CE;</button>
      </div>
    </div>
  );
}

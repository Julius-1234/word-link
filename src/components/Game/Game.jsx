import "./Game.css";
import GameMode from "../GameMode/GameMode.jsx";
export default function Game({ path, start, end, guess, date }) {
  return (
    <>
      <div className="game-info">
        <GameMode />
        <div className="game-info-date">
          {date
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            : ""}
        </div>
      </div>
      <div className="game-box">
        <div className="game-start-word">{start}</div>
        {path?.map((word) => {
          return (
            <div key={word} className="game-path-word">
              {word}
            </div>
          );
        })}
        <div className="game-input">{guess}</div>
        <div className="game-end-word">{end}</div>
      </div>
    </>
  );
}

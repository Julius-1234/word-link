import "./Game.css";

import { useEffect } from "react";
export default function Game({ path, start, end, guess, maxGuesses }) {
  return (
    <div className="game-box">
      <div className="game-start-word">{start}</div>
      {path.map((word) => {
        return (
          <div key={word} className="game-path-word">
            {word}
          </div>
        );
      })}
      <div className="game-input">{guess}</div>
      <div className="game-end-word">{end}</div>
    </div>
  );
}

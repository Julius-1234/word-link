import { useState, useEffect } from "react";
import { useGame } from "./GameEngine.jsx";

import GameSelect from "./GameSelect.jsx";
import Game from "./Game.jsx";

export default function Content() {
  const {
    path,
    start,
    end,
    guess,
    maxGuesses,
    difficulty,
    unlockedDifficulties,
    difficultyInfo,
    setDifficulty,
  } = useGame();
  return (
    <div>
      <GameSelect
        difficulty={difficulty}
        unlockedDifficulties={unlockedDifficulties}
        difficultyInfo={difficultyInfo}
        setDifficulty={setDifficulty}
      />
      <Game
        path={path}
        start={start}
        end={end}
        guess={guess}
        maxGuesses={maxGuesses}
      />
    </div>
  );
}

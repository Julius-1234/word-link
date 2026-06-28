import { useState, useEffect } from "react";
import { useGame } from "../../game/GameEngine.jsx";

import GameSelect from "../GameSelect/GameSelect.jsx";
import Game from "../Game/Game.jsx";
import Keyboard from "../Keyboard/Keyboard.jsx";

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
    date,
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
        date={date}
      />
      <Keyboard />
    </div>
  );
}

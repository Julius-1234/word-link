import { useState, useEffect } from "react";
import { useSettings } from "../../providers/SettingsProvider.jsx";

import GameSelect from "../GameSelect/GameSelect.jsx";
import GameInfo from "../GameInfo/GameInfo.jsx";
import Game from "../Game/Game.jsx";
import Keyboard from "../Keyboard/Keyboard.jsx";

export default function Content() {
  const { settings } = useSettings();
  return (
    <>
      <GameSelect />
      <GameInfo />
      <Game />
      {settings.keyboard && <Keyboard />}
    </>
  );
}

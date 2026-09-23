import { useSettings } from "../../providers/SettingsProvider.jsx";
import styles from "./Content.module.scss";

import GameSelect from "../GameSelect/GameSelect.jsx";
import GameInfo from "../GameInfo/GameInfo.jsx";
import StepsCounter from "../StepsCounter/StepsCounter.jsx";
import Game from "../Game/Game.jsx";
import Keyboard from "../Keyboard/Keyboard.jsx";

export default function Content() {
  const { settings } = useSettings();
  return (
    <div className={styles.content}>
      <GameSelect />
      <GameInfo />
      <StepsCounter />
      <Game />
      {settings.keyboard && <Keyboard />}
    </div>
  );
}

import GameMode from "../GameMode/GameMode.jsx";
import styles from "./GameInfo.module.scss";

export default function GameInfo({ date }) {
  return (
    <div className={styles.gameInfo}>
      <GameMode />
      <div className={styles.gameInfoDate}>
        {date
          ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
          : ""}
      </div>
    </div>
  );
}

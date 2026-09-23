import { useGame } from "../../game/GameEngine";
import { difficultyInfo } from "../../utils/constants";
import styles from "./StepsCounter.module.scss";

export default function StepsCounter() {
  const { difficultyInfo, difficulty, path, guess } = useGame();
  return (
    <div className={styles.StepsCounter}>
      <div>
        Steps: {guess && guess.length > 0 ? path.length + 1 : path.length}{" "}
      </div>
      <div>Goal: {difficultyInfo.difficulties[difficulty].steps}</div>
    </div>
  );
}

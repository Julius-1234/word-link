import { useGame } from "../../game/GameEngine";
import styles from "./StepsCounter.module.scss";

export default function StepsCounter() {
  const { difficulty, path, guess, steps } = useGame();
  return (
    <div className={styles.StepsCounter}>
      <div>
        Steps: {guess && guess.length > 0 ? path.length + 1 : path.length}{" "}
      </div>
      <div>Goal: {steps}</div>
    </div>
  );
}

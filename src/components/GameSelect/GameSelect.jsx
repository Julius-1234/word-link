import styles from "./GameSelect.module.scss";
import Btn from "../Btn/Btn";

export default function GameSelect({
  difficulty,
  unlockedDifficulties,
  difficultyInfo,
  setDifficulty,
}) {
  return (
    <div className={styles.gameNav}>
      {difficultyInfo.order.map((key, i) => {
        const item = difficultyInfo.difficulties[key];
        let mode = styles.locked;
        if (unlockedDifficulties?.includes(key)) mode = styles.unlocked;
        if (difficulty === key) mode = styles.selected;
        return (
          <Btn
            key={i}
            className={`${mode} ${styles.btn}`}
            onClick={() => {
              setDifficulty(key);
            }}
          >
            {item.displayName}
          </Btn>
        );
      })}
    </div>
  );
}

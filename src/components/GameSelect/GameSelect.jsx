import styles from "./GameSelect.module.scss";

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
        let className = styles.locked;
        if (unlockedDifficulties?.includes(key)) className = styles.unlocked;
        if (difficulty === key) className = styles.selected;
        return (
          <button
            key={i}
            className={className}
            onClick={() => {
              setDifficulty(key);
            }}
          >
            {item.displayName}
          </button>
        );
      })}
    </div>
  );
}

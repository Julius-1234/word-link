import "./GameSelect.css";

export default function GameSelect({
  difficulty,
  unlockedDifficulties,
  difficultyInfo,
  setDifficulty,
}) {
  return (
    <div className="game-nav">
      {difficultyInfo.order.map((key, i) => {
        const item = difficultyInfo.difficulties[key];
        let className = "locked";
        if (unlockedDifficulties?.includes(key)) className = "unlocked";
        if (difficulty === key) className = "selected";
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

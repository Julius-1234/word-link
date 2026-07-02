import styles from "./ArchiveKey.module.scss";
import { difficultyInfo } from "../../utils/constants.js";

export default function ArchiveKey() {
  return (
    <div className={styles.archiveKey}>
      {Object.values(difficultyInfo.difficulties).map((difficulty, i) => (
        <div key={i} className={styles.difficultyKey}>
          <div
            className={styles.difficultyKeyColour}
            style={{ backgroundColor: difficulty.beatenColour }}
          />
          = completed
          <div className={styles.difficultyKeyName}>
            {difficulty.displayName}
          </div>
        </div>
      ))}
    </div>
  );
}

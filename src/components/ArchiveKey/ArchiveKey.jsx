import styles from "./ArchiveKey.module.scss";
import { difficultyInfo } from "../../utils/constants.js";

export default function ArchiveKey() {
  return (
    <div className={styles.archiveKey}>
      {Object.values(difficultyInfo.difficulties).map((difficulty, i) => (
        <div key={i} className={styles.difficultyKey}>
          <span
            className={styles.difficultyKeyColour}
            style={difficulty.beatenStyles}
          />

          {" = completed " + difficulty.displayName}
        </div>
      ))}
    </div>
  );
}

import styles from "./GameMode.module.scss";

import { Link } from "react-router-dom";

import { getGameMode } from "../../utils/url.js";

import { newPracticeCode } from "../../utils/random.js";

export default function GameMode() {
  const gameMode = getGameMode();
  return (
    <div className={styles.gameInfoSelect}>
      <div className={styles.gameInfoSelectSelected}>{gameMode} &#x25BE;</div>
      <div className={styles.gameInfoSelectOptions}>
        {gameMode !== "daily" && (
          <Link to="/" className={styles.gameInfoSelectOption}>
            Daily
          </Link>
        )}
        <Link to="/archive" className={styles.gameInfoSelectOption}>
          Archive
        </Link>
        {gameMode !== "practice" && (
          <Link
            to={{
              pathname: "/",
              search: `?practice=${newPracticeCode()}`,
            }}
            className={styles.gameInfoSelectOption}
          >
            Practice
          </Link>
        )}
      </div>
    </div>
  );
}

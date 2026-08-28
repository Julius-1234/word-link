import styles from "./GameMode.module.scss";

import { Link } from "react-router-dom";

import { newPracticeCode } from "../../utils/random.js";

import { modesDisplayName, modes } from "../../utils/modes.js";

import { toQueryString } from "../../utils/url.js";

export default function GameMode({ gameMode }) {
  return (
    <div className={styles.gameInfoSelect}>
      <div className={styles.gameInfoSelectSelected}>
        {modesDisplayName(gameMode)} &#x25BE;
      </div>
      <div className={styles.gameInfoSelectOptions}>
        {gameMode !== modes.daily && (
          <Link to="/" className={styles.gameInfoSelectOption}>
            {modesDisplayName(modes.daily)}
          </Link>
        )}
        <Link to="/archive" className={styles.gameInfoSelectOption}>
          {modesDisplayName(modes.archive)}
        </Link>
        {gameMode !== modes.practice && (
          <Link
            to={{
              pathname: "/",
              search: toQueryString(modes.practice, newPracticeCode()),
            }}
            className={styles.gameInfoSelectOption}
          >
            {modesDisplayName(modes.practice)}
          </Link>
        )}
      </div>
    </div>
  );
}

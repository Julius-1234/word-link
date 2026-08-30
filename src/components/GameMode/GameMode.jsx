import styles from "./GameMode.module.scss";

import { Link } from "react-router-dom";

import { newPracticeCode } from "../../utils/random.js";

import { modesDisplayName, modes } from "../../utils/modes.js";

import { toQueryString } from "../../utils/url.js";

export default function GameMode({ gameMode }) {
  return (
    <div className={styles.dropDownWrapper}>
      <div className={styles.dropDown}>
        <div className={styles.dropDownSelected}>
          {modesDisplayName(gameMode)} &#x25BE;
        </div>
        <div className={styles.dropDownOptions}>
          {gameMode !== modes.daily && (
            <Link to="/" className={styles.dropDownOption}>
              {modesDisplayName(modes.daily)}
            </Link>
          )}
          <Link to="/archive" className={styles.dropDownOption}>
            {modesDisplayName(modes.archive)}
          </Link>
          {gameMode !== modes.practice && (
            <Link
              to={{
                pathname: "/",
                search: toQueryString(modes.practice, newPracticeCode()),
              }}
              className={styles.dropDownOption}
            >
              {modesDisplayName(modes.practice)}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

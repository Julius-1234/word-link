import styles from "./GameMode.module.scss";

import { Link } from "react-router-dom";

import { isFromArchive } from "../../utils/date.js";

export default function GameMode() {
  const isArchive = isFromArchive();
  return (
    <div className={styles.gameInfoSelect}>
      <div className={styles.gameInfoSelectSelected}>
        {isArchive ? "archive" : "daily"} &#x25BE;
      </div>
      <div className={styles.gameInfoSelectOptions}>
        {isArchive && (
          <Link to="/" className={styles.gameInfoSelectOption}>
            Daily
          </Link>
        )}
        <Link to="/archive" className={styles.gameInfoSelectOption}>
          Archive
        </Link>
      </div>
    </div>
  );
}

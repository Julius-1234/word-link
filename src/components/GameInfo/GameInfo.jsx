import styles from "./GameInfo.module.scss";

import { Link } from "react-router-dom";

import { isFromArchive } from "../../utils/date.js";

export default function GameInfo({ date }) {
  return (
    <div className={styles.gameInfo}>
      <div className={styles.gameInfoDate}>
        {date
          ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
          : ""}
      </div>
      {isFromArchive() && <Link to="/">Daily</Link>}
      <Link to="/archive">Archive</Link>
    </div>
  );
}

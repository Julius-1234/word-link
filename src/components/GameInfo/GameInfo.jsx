import styles from "./GameInfo.module.scss";

import { Link } from "react-router-dom";

import GameMode from "../GameMode/GameMode.jsx";

import { isFromArchive, formatDate, timeAgo } from "../../utils/date.js";

export default function GameInfo({ date }) {
  return (
    <div className={styles.gameInfo}>
      <GameMode />
      <div className={styles.gameInfoDate}>
        {formatDate(date)} {isFromArchive() && `(${timeAgo(new Date(date))})`}
      </div>
    </div>
  );
}

import GameStats from "../../components/GameStats/GameStats.jsx";
import AllStats from "../../components/AllStats/AllStats.jsx";
import { Link } from "react-router-dom";

import styles from "./MainStats.module.scss";

export default function MainStats() {
  const date = new Date();
  return (
    <div>
      <div className={styles.mainStatsNav}>
        <Link to="/">&#x276E; home</Link>
      </div>
      <div className={styles.allStatsTitle}>All Stats</div>
      <AllStats />
      <div className={styles.gameStatsTitle}>Current Game Stats</div>
      <GameStats date={date.getTime()} />
    </div>
  );
}

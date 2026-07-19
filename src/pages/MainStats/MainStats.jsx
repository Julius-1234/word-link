import GameStats from "../../components/GameStats/GameStats.jsx";
import AllStats from "../../components/AllStats/AllStats.jsx";

import styles from "./MainStats.module.scss";

import HomeLink from "../../components/HomeLink/HomeLink.jsx";

export default function MainStats() {
  return (
    <div>
      <HomeLink />
      <div className={styles.allStatsTitle}>All Stats</div>
      <AllStats />
      <div className={styles.gameStatsTitle}>Current Game Stats</div>
      <GameStats />
    </div>
  );
}

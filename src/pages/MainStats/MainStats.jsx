import GameStats from "../../components/GameStats/GameStats.jsx";
import AllStats from "../../components/AllStats/AllStats.jsx";
import PracStats from "../../components/PracStats/PracStats.jsx";

import styles from "./MainStats.module.scss";

import HomeLink from "../../components/HomeLink/HomeLink.jsx";

export default function MainStats() {
  return (
    <div>
      <HomeLink />
      <div className={styles.title}>All Stats</div>
      <AllStats />
      <div className={styles.title}>Current Game Stats</div>
      <GameStats />
      <div className={styles.title}>Practice Stats</div>
      <PracStats />
    </div>
  );
}

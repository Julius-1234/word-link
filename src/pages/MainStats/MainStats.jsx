import GameStats from "../../components/GameStats/GameStats.jsx";
import AllStats from "../../components/AllStats/AllStats.jsx";
import PracStats from "../../components/PracStats/PracStats.jsx";
import Title from "../../components/Title/Title.jsx";

import styles from "./MainStats.module.scss";

import HomeLink from "../../components/HomeLink/HomeLink.jsx";

export default function MainStats() {
  return (
    <div>
      <HomeLink />
      <Title className={styles.title}>All Stats</Title>
      <AllStats />
      <Title className={styles.title}>Current Game Stats</Title>
      <GameStats />
      <Title className={styles.title}>Practice Stats</Title>
      <PracStats />
    </div>
  );
}

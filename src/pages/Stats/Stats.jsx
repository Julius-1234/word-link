import GameStats from "../../components/GameStats/GameStats.jsx";
import AllStats from "../../components/AllStats/AllStats.jsx";
import PracStats from "../../components/PracStats/PracStats.jsx";

import Title from "../../components/Title/Title.jsx";

import HomeLink from "../../components/HomeLink/HomeLink.jsx";

import styles from "./Stats.module.scss";

export default function Stats() {
  return (
    <div>
      <HomeLink />
      <Title className={styles.title}>All Daily Stats</Title>
      <AllStats />
      <Title className={styles.title}>Current Game Stats</Title>
      <GameStats />
      <Title className={styles.title}>All Practice Stats</Title>
      <PracStats />
    </div>
  );
}

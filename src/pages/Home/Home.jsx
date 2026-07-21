import { useState } from "react";

import HomeHeader from "../../components/HomeHeader/HomeHeader.jsx";
import Content from "../../components/Content/Content.jsx";
import GameEngine from "../../game/GameEngine.jsx";
import HomeFooter from "../../components/HomeFooter/HomeFooter.jsx";

import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <HomeHeader />
      <GameEngine>
        <Content />
        <HomeFooter />
      </GameEngine>
    </div>
  );
}

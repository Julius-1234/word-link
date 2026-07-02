import { useState } from "react";

import HomeHeader from "../../components/HomeHeader/HomeHeader.jsx";
import Content from "../../components/Content/Content.jsx";
import GameEngine from "../../game/GameEngine.jsx";
import MessageDisplay from "../../components/MessageDisplay/MessageDisplay.jsx";
import HomeFooter from "../../components/HomeFooter/HomeFooter.jsx";

import styles from "./Home.module.scss";

export default function Home() {
  const errorsMax = 5;
  function addMessage(message) {
    setMessages((prev) => [message, ...prev].slice(0, errorsMax));
    setTimeout(() => {
      setMessages((prev) => prev.slice(0, -1));
    }, 2000);
  }
  const [messages, setMessages] = useState([]);

  return (
    <div className={styles.home}>
      <MessageDisplay data={messages}></MessageDisplay>
      <HomeHeader />
      <GameEngine onMessage={addMessage}>
        <Content />
        <HomeFooter />
      </GameEngine>
    </div>
  );
}

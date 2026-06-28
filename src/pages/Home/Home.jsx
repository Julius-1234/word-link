import { useState } from "react";

import Head from "../../components/Head/Head.jsx";
import Content from "../../components/Content/Content.jsx";
import GameEngine from "../../game/GameEngine.jsx";
import Errors from "../../components/Messages/Messages.jsx";

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
    <>
      <Errors data={messages}></Errors>
      <Head />
      <GameEngine onMessage={addMessage}>
        <Content />
      </GameEngine>
    </>
  );
}

import { useState } from "react";

import Head from "../../components/Head/Head.jsx";
import Content from "../../components/Content/Content.jsx";
import GameEngine from "../../game/GameEngine.jsx";
import Errors from "../../components/Messages/Messages.jsx";

export default function Home() {
  const [message, setMessage] = useState({
    message: null,
    timeStamp: null,
    type: null,
  });

  return (
    <>
      <Errors data={message}></Errors>
      <Head />
      <GameEngine onMessage={setMessage}>
        <Content />
      </GameEngine>
    </>
  );
}

import { useState } from "react";

import Head from "./Head.jsx";
import Content from "./Content.jsx";
import GameEngine from "./GameEngine.jsx";
import Errors from "./Messages.jsx";

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

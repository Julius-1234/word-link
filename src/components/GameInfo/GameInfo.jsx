import styles from "./GameInfo.module.scss";
import { Link, useNavigate } from "react-router-dom";
import GameMode from "../GameMode/GameMode.jsx";
import { formatDate, timeAgo } from "../../utils/date.js";
import { getGameMode } from "../../utils/url.js";
import { newPracticeCode } from "../../utils/random.js";
import { useMessage } from "../../providers/MessageProvider.jsx";

export default function GameInfo({ date }) {
  const navigate = useNavigate();
  const onMessage = useMessage();
  const gameMode = getGameMode();
  const copyURL = () => {
    navigator.clipboard.writeText(location.href);
    onMessage({
      message: "copied",
      timeStamp: Date.now(),
      type: "message",
    });
  };
  const newPrac = () => {
    const newCode = newPracticeCode();
    navigate(`/?practice=${newCode}`);
  };
  return (
    <div className={styles.gameInfo}>
      <GameMode />
      {gameMode === "practice" && (
        <>
          <button onClick={copyURL}>Copy URL</button>
          <button onClick={newPrac}>New Practice</button>
        </>
      )}
      {gameMode !== "practice" && <div>{formatDate(date)} </div>}
      {gameMode === "archive" && <div>{`(${timeAgo(new Date(date))})`}</div>}
    </div>
  );
}

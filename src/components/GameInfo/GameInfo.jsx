import styles from "./GameInfo.module.scss";
import { Link, useNavigate } from "react-router-dom";
import GameMode from "../GameMode/GameMode.jsx";
import { formatDate, timeAgo, formatFromDays } from "../../utils/date.js";
import { newPracticeCode } from "../../utils/random.js";
import { useMessage } from "../../providers/MessageProvider.jsx";
import ConfirmSequence from "../ConfirmSequence/ConfirmSequence.jsx";
import Btn from "../Btn/Btn.jsx";
import { useGame } from "../../game/GameEngine.jsx";
import { modes } from "../../utils/modes.js";
import { toQueryString } from "../../utils/url.js";

export default function GameInfo() {
  const { key, gameMode } = useGame();
  const navigate = useNavigate();
  const onMessage = useMessage();
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
    navigate(`/${toQueryString(modes.practice, newCode)}`);
  };
  return (
    <div className={styles.gameInfo}>
      <GameMode gameMode={gameMode} />
      {gameMode === modes.practice && (
        <>
          <Btn onClick={copyURL}>Copy URL</Btn>
          <Btn>
            <ConfirmSequence sequence={[["new prac"], ["confirm?", newPrac]]} />
          </Btn>
        </>
      )}
      {gameMode !== modes.practice && (
        <div>{formatDate(formatFromDays(key))} </div>
      )}
      {gameMode === modes.archive && (
        <div>{`(${timeAgo(formatFromDays(key))})`}</div>
      )}
    </div>
  );
}

import styles from "./GameStats.module.scss";
import { difficultyInfo } from "../../utils/constants.js";
import ShadowScrollBox from "../ShadowScrollBox/ShadowScrollBox.jsx";
import { getData } from "../../utils/storage.js";
import {
  formatDate,
  timeAgo,
  formatToDays,
  formatFromDays,
} from "../../utils/date.js";
import { toGameKey, modesDisplayName, modes } from "../../utils/modes.js";

export default function GameStats({ gameData }) {
  const data = getData();
  const loaded = gameData ?? data.loaded;
  const gameMode = loaded.gameMode;
  const key = loaded.key;

  if (!gameMode || !key) return <div>No stats available</div>;

  const gameKey = toGameKey(gameMode, key);
  const lastGame = data.sets[gameKey];

  const games = lastGame.games ? Object.entries(lastGame.games) : [];
  const gameEls = games.map((pair, i) => {
    const paths = pair[1].found.sort((a, b) => a.length - b.length);
    if (paths.length === 0) return null;

    const pathEls = paths.map((path, i) => (
      <div className={styles.gameStatsPath} key={i}>
        <div className={styles.gameStatsPathStart}>{pair[1].start}</div>
        {path.map((word, i) => (
          <div className={styles.gameStatsPathWord} key={i}>
            {word}
          </div>
        ))}
        <div className={styles.gameStatsPathEnd}>{pair[1].end}</div>
      </div>
    ));

    return (
      <div className={styles.gameStatsBox} key={i}>
        <div className={styles.gameStatsTitle}>
          {`${difficultyInfo.difficulties[pair[0]].displayName} (best: ${paths[0].length + 1} steps)`}
          <br />
          <b>
            {pair[1].start} &rarr; {pair[1].end}
          </b>
        </div>
        <ShadowScrollBox className={styles.gameStatsInfo}>
          {pathEls}
        </ShadowScrollBox>
      </div>
    );
  });

  return (
    <div className={styles.gameStatsBox}>
      <b>
        {modesDisplayName(gameMode)}:{" "}
        {gameMode !== modes.practice ? formatDate(formatFromDays(key)) : key}
      </b>
      {gameEls}
    </div>
  );
}

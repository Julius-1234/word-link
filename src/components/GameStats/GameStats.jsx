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

/*
loaded: {gameMode: 'practice', key: 9827796562}
sets: 
  daily_20677: 
    {unlockedDifficulties: Array(1), games: {…}, currentDifficulty: 'easy'} 
  prac_9827796562: 
    {unlockedDifficulties: Array(1), games: {…}, currentDifficulty: 'easy'}
*/

export default function GameStats({ gameData }) {
  const data = getData();
  const loaded = gameData ?? data.loaded;
  const gameMode = loaded.gameMode;
  const key = loaded.key;

  if (!gameMode || !key) return <div>No stats available</div>;

  const gameKey = toGameKey(gameMode, key);
  const lastGame = data.sets[gameKey];

  const games = lastGame.games ? Object.entries(lastGame.games) : [];

  return (
    <div className={styles.gameStatsBox}>
      <b>
        {modesDisplayName(gameMode)}:{" "}
        {gameMode !== modes.practice ? formatDate(formatFromDays(key)) : key}
      </b>
      {games.map((pair, i) => {
        const paths = pair[1].found;
        if (paths.length === 0) return;
        return (
          <div className={styles.gameStatsBox} key={i}>
            <div className={styles.gameStatsTitle}>
              {`${difficultyInfo.difficulties[pair[0]].displayName} (${paths.length})`}
              <br />
              <b>
                {pair[1].start} &rarr; {pair[1].end}
              </b>
            </div>
            <ShadowScrollBox className={styles.gameStatsInfo}>
              {paths
                .sort((a, b) => a.length - b.length)
                .map((path, i) => (
                  <div className={styles.gameStatsPath} key={i}>
                    <div className={styles.gameStatsPathStart}>
                      {pair[1].start}
                    </div>
                    {path.map((word, i) => (
                      <div className={styles.gameStatsPathWord} key={i}>
                        {word}
                      </div>
                    ))}
                    <div className={styles.gameStatsPathEnd}>{pair[1].end}</div>
                  </div>
                ))}
            </ShadowScrollBox>
          </div>
        );
      })}
    </div>
  );
}

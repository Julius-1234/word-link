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

export default function GameStats({ date }) {
  const stats = getData();
  let currentSet;
  let id;
  const gameMode = stats.lastGameMode;
  if (!date) {
    if (!gameMode) return <div>No stats available</div>;
    if (gameMode !== "practice") {
      const key = stats.dateKey;
      currentSet = stats.days?.[key] || {};
      id = formatDate(formatFromDays(key));
    } else {
      const key = stats.pracCode;
      currentSet = stats.pracs?.[key] || {};
      id = key;
    }
  } else {
    currentSet = stats.days?.[formatToDays(date)] || {};
    id = formatDate(date);
  }

  const games = currentSet.games ? Object.entries(currentSet.games) : [];

  return (
    <div className={styles.gameStatsBox}>
      <b>
        {date ? "archive" : gameMode}: {id}
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

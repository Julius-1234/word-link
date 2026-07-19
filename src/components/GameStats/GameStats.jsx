import styles from "./GameStats.module.scss";
import { difficultyInfo } from "../../utils/constants.js";
import { getData } from "../../utils/storage.js";
import {
  formatDate,
  timeAgo,
  formatToDays,
  formatFromDays,
} from "../../utils/date.js";

export default function GameStats({ date }) {
  const stats = getData();
  date ??= formatFromDays(stats.dateKey) || new Date();
  const currentDay = stats.days?.[formatToDays(date)] || {};
  const games = currentDay.games ? Object.entries(currentDay.games) : [];
  return (
    <div className={styles.gameStatsBox}>
      <b>{formatDate(new Date(date))}</b>
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
            <div className={`${styles.gameStatsInfo} scrollbar-styles`}>
              {paths
                .sort((a, b) => {
                  a.length - b.length;
                })
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
            </div>
          </div>
        );
      })}
    </div>
  );
}

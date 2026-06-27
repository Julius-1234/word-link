import "./GameStats.css";
import { difficultyInfo } from "../../utils/constants.js";
import { getData } from "../../utils/storage.js";

export default function GameStats({ date }) {
  const stats = getData();
  date = new Date(date);
  date = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
  const currentDay = stats.days?.[date.toString()] || {};
  const games = currentDay.games ? Object.entries(currentDay.games) : [];
  let dateString = new Date(date);
  dateString = `${dateString.getDate()}/${dateString.getMonth() + 1}/${dateString.getFullYear()}`;
  return (
    <div className="game-stats">
      <b>{dateString}</b>
      {games.map((pair, i) => {
        const paths = pair[1].found;
        if (paths.length === 0) return;
        return (
          <div className="game-stats-box" key={i}>
            <div className="game-stats-title">
              {`${difficultyInfo.difficulties[pair[0]].displayName} (${paths.length})`}
              <br />
              <b>
                {pair[1].start} &rarr; {pair[1].end}
              </b>
            </div>
            <div className="game-stats-info">
              {paths
                .sort((a, b) => {
                  a.length - b.length;
                })
                .map((path, i) => (
                  <div className="game-stats-path" key={i}>
                    <div className="game-stats-path-start">{pair[1].start}</div>
                    {path.map((word, i) => (
                      <div className="game-stats-path-word" key={i}>
                        {word}
                      </div>
                    ))}
                    <div className="game-stats-path-end">{pair[1].end}</div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

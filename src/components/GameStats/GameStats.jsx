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
    <div className="gameStats">
      <b>{dateString}</b>
      {games.map((pair, i) => {
        const paths = pair[1].found;
        if (paths.length === 0) return;
        return (
          <div className="gameStatBox" key={i}>
            <div className="gameStatTitle">
              {`${difficultyInfo.difficulties[pair[0]].displayName} (${paths.length})`}
              <br />
              <b>
                {pair[1].start} &rarr; {pair[1].end}
              </b>
            </div>
            <div className="gameStatInfo">
              {paths
                .sort((a, b) => {
                  a.length - b.length;
                })
                .map((path, i) => (
                  <div className="gameStatPath" key={i}>
                    <div className="gameStatPathStart">{pair[1].start}</div>
                    {path.map((word, i) => (
                      <div className="gameStatPathWord" key={i}>
                        {word}
                      </div>
                    ))}
                    <div className="gameStatPathEnd">{pair[1].end}</div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

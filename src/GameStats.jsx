import "./GameStats.css";

export default function GameStats({ date }) {
  const stats = JSON.parse(localStorage.getItem("data")) || {};
  date = new Date(date);
  date = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
  const currentDay = stats.days[date.toString()] || {};
  const games = currentDay.games ? Object.entries(currentDay.games) : [];

  return (
    <div className="gameStats">
      {games.map((pair, i) => {
        const paths = pair[1].found;
        if (paths.length === 0) return;
        return (
          <div className="gameStatBox" key={i}>
            <div className="gameStatTitle">{`${pair[0]} (${paths.length})`}</div>
            <div className="gameStatInfo">
              {paths.map((path, i) => (
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

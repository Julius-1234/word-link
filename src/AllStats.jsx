import { useMemo } from "react";
import { difficultyInfo } from "./constants.js";

export default function AllStats() {
  const data = JSON.parse(localStorage.getItem("data")) || { days: {} };
  const prossesedInfo = { difficultyStats: {} };
  const difficulties = difficultyInfo.order;
  useMemo(() => {
    for (const difficulty of difficulties) {
      prossesedInfo.difficultyStats[difficulty] = {};
      const stats = prossesedInfo.difficultyStats[difficulty];
      stats.all = Object.values(data.days)
        .map((day) => day.games[difficulty])
        .filter((item) => item !== undefined);
      stats.wins = stats.all.filter((day) => day.found.length > 0);
    }
    console.log(prossesedInfo.difficultyStats);
  }, [data]);
  const getDataRow = (title, func, titleRow = false) => {
    return (
      <tr>
        <td>{title}</td>
        {difficulties.map((item, i) => {
          return <td key={i}>{func(item)}</td>;
        })}
      </tr>
    );
  };
  return (
    <table className="allStatsTable">
      <tbody>
        {getDataRow("", (item) => item, true)}
        {getDataRow(
          "wins",
          (item) => prossesedInfo.difficultyStats[item].wins.length,
        )}
      </tbody>
    </table>
  );
}

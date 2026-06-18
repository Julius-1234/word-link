import { useMemo } from "react";
import { difficultyInfo } from "./constants.js";
import "./AllStats.css";

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
      stats.daysWithWins = stats.all.filter((day) => day.found.length > 0);
      stats.wins = stats.all.reduce(
        (total, next) => total + next.found.length,
        0,
      );
    }
    console.log(prossesedInfo.difficultyStats);
  }, [data]);
  const getDataRow = (title, func, titleRow = false) => {
    return (
      <tr>
        <td className="boldCell">{title}</td>
        {difficulties.map((item, i) => {
          return (
            <td className={titleRow ? "boldCell" : undefined} key={i}>
              {func(item)}
            </td>
          );
        })}
      </tr>
    );
  };
  return (
    <table className="allStatsTable">
      <tbody>
        {getDataRow("", (item) => item, true)}
        {getDataRow(
          "days with paths",
          (item) => prossesedInfo.difficultyStats[item].daysWithWins.length,
        )}
        {getDataRow(
          "total paths",
          (item) => prossesedInfo.difficultyStats[item].wins,
        )}
      </tbody>
    </table>
  );
}

import { useMemo } from "react";
import { difficultyInfo } from "../../utils/constants.js";
import "./AllStats.css";
import { getData } from "../../utils/storage.js";

export default function AllStats() {
  const data = getData();
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
  }, [data]);
  const getDataRow = (title, func, titleRow = false) => {
    return (
      <tr>
        <td className="bold-cell">{title}</td>
        {difficulties.map((item, i) => {
          return (
            <td className={titleRow ? "bold-cell" : undefined} key={i}>
              {func(item)}
            </td>
          );
        })}
      </tr>
    );
  };
  return (
    <table className="all-stats-table">
      <tbody>
        {getDataRow(
          "",
          (item) => difficultyInfo.difficulties[item].displayName,
          true,
        )}
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

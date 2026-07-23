/*import { useMemo } from "react";
import { difficultyInfo } from "../../utils/constants.js";
import styles from "./AllStats.module.scss";
import { getData } from "../../utils/storage.js";


export default function AllStats() {
  const data = getData();
  const prossesedInfo = { difficultyStats: {} };
  const difficulties = difficultyInfo.order;
  useMemo(() => {
    for (const difficulty of difficulties) {
      const stats = (prossesedInfo.difficultyStats[difficulty] = {});
      const allDays = Object.values(data.days)
        .map((day) => day.games[difficulty])
        .filter((item) => item !== undefined);

      stats.daysWithWins = allDays.filter((day) => day.found.length > 0);
      stats.wins = allDays.reduce(
        (total, next) => total + next.found.length,
        0,
      );
    }
  }, [data]);
  const getDataRow = (title, func, titleRow = false) => {
    return (
      <tr>
        <td className={styles.boldCell}>{title}</td>
        {difficulties.map((item, i) => {
          return (
            <td className={titleRow ? styles.boldCell : undefined} key={i}>
              {func(item)}
            </td>
          );
        })}
      </tr>
    );
  };
  return (
    <table className={styles.allStatsTable}>
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
}*/

import { useMemo } from "react";
import StatsTable, { createRow } from "../StatsTable/StatsTable";
import { getData } from "../../utils/storage.js";
import { difficultyInfo } from "../../utils/constants.js";

export default function AllStats() {
  const data = getData();
  const difficulties = difficultyInfo.order;
  const rows = useMemo(() => {
    const diffStats = {};
    const allDays = data.days;
    for (const diff of difficulties) {
      const allOfDiff = Object.keys(allDays)
        .map((day) => allDays[day].games[diff])
        .filter((day) => !!day)
        .filter((day) => day.found.length > 0);
      diffStats[diff] = allOfDiff;
    }
    console.log(diffStats);
    console.log(diffStats);
    return [
      {
        displayName: "days with 1+ paths",
        diffs: createRow(diffStats, (data) => data.length),
      },
      {
        displayName: "total paths",
        diffs: createRow(diffStats, (data) =>
          data.reduce((total, next) => total + next.found.length, 0),
        ),
      },
    ];
  }, [data]);
  return (
    <>
      <StatsTable rows={rows} />
    </>
  );
}

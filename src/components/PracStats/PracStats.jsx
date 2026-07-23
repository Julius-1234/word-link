import { useMemo } from "react";
import StatsTable, { createRow } from "../StatsTable/StatsTable";
import { getData } from "../../utils/storage.js";
import { difficultyInfo } from "../../utils/constants.js";

export default function PracStats() {
  const data = getData();
  const difficulties = difficultyInfo.order;
  const rows = useMemo(() => {
    const diffStats = {};
    const allPracs = data.pracs;
    for (const diff of difficulties) {
      const allOfDiff = Object.keys(allPracs)
        .map((prac) => allPracs[prac].games[diff])
        .filter((prac) => !!prac)
        .filter((prac) => prac.found.length > 0);
      diffStats[diff] = allOfDiff;
    }
    console.log(diffStats);
    return [
      {
        displayName: "pracs with 1+ paths",
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

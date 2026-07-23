import { useMemo } from "react";
import StatsTable, { createRow, sortIntoDiffs } from "../StatsTable/StatsTable";
import { getData } from "../../utils/storage.js";
import { difficultyInfo } from "../../utils/constants.js";

export default function PracStats() {
  const data = getData();
  const difficulties = difficultyInfo.order;
  const rows = useMemo(() => {
    const allPracs = data.pracs;
    const diffStats = sortIntoDiffs(allPracs);
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

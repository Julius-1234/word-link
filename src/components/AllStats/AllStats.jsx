import { useMemo } from "react";
import StatsTable, { createRow, sortIntoDiffs } from "../StatsTable/StatsTable";
import { getData } from "../../utils/storage.js";
import { difficultyInfo } from "../../utils/constants.js";

export default function AllStats() {
  const data = getData();
  const difficulties = difficultyInfo.order;
  const rows = useMemo(() => {
    const allDays = data.days;
    const diffStats = sortIntoDiffs(allDays);
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

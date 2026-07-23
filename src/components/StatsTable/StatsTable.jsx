import { difficultyInfo } from "../../utils/constants.js";
import styles from "./StatsTable.module.scss";

const difficulties = difficultyInfo.order;
export default function StatsTable({ rows }) {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th />
          {difficulties.map((diff) => (
            <th>{difficultyInfo.difficulties[diff].displayName}</th>
          ))}
        </tr>
        {rows.map((row, i) => {
          return (
            <tr key={i}>
              <th>{row.displayName}</th>
              {difficulties.map((diff, i) => {
                return <td key={i}>{row.diffs[diff] || "-"}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function createRow(data, func) {
  const row = {};
  for (const diff of difficulties) {
    row[diff] = func(data[diff]);
  }
  return row;
}

import { getData } from "../../utils/storage";
import { difficultyInfo } from "../../utils/constants";
import styles from "./StatsRow.module.scss";

export default function StatsRow({ keyFilter, reduceFunc, title }) {
  const data = getData();
  const sets = data.sets;

  const sortedInfo = {};
  for (const diff of difficultyInfo.order) {
    const all = Object.keys(sets)
      .filter((key) => keyFilter(key))
      .map((item) => sets[item].games[diff])
      .filter((item) => !!item);
    sortedInfo[diff] = all;
  }

  return (
    <tr className={styles.row}>
      <th>{title ?? ""}</th>
      {difficultyInfo.order.map((diff, i) => (
        <td key={i}>{sortedInfo[diff].reduce(reduceFunc, 0)}</td>
      ))}
    </tr>
  );
}

export function DiffsRow() {
  return (
    <tr className={styles.row}>
      <th></th>
      {difficultyInfo.order.map((diff, i) => (
        <td key={i}>{difficultyInfo.difficulties[diff].displayName}</td>
      ))}
    </tr>
  );
}

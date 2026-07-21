import { Link } from "react-router-dom";

import styles from "./HomeLink.module.scss";

import { getData } from "../../utils/storage";

import { formatToDays } from "../../utils/date";

export default function HomeLink() {
  const data = getData();
  const gameMode = data.lastGameMode || "daily";
  let search;
  if (gameMode === "archive") {
    const dateKey = data.dateKey;
    if (dateKey !== undefined) search = `archive=${dateKey}`;
  } else if (gameMode === "practice") {
    const pracCode = data.pracCode;
    if (pracCode !== undefined) search = `practice=${pracCode}`;
  }
  return (
    <div className={styles.nav}>
      <Link to={{ pathname: "/", search }}>&#x276E; home</Link>
    </div>
  );
}

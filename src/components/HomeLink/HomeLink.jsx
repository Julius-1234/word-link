import { Link } from "react-router-dom";

import styles from "./HomeLink.module.scss";

import { getData } from "../../utils/storage";

import { formatToDays } from "../../utils/date";

export default function HomeLink() {
  const data = getData() || {};
  const dateKey = data.dateKey || null;
  const today = formatToDays(Date.now()).toString();
  let search;
  if (dateKey && dateKey !== today) search = `archive=${dateKey}`;
  return (
    <div className={styles.nav}>
      <Link to={{ pathname: "/", search }}>&#x276E; home</Link>
    </div>
  );
}

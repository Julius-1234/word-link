import { Link } from "react-router-dom";

import styles from "./HomeLink.module.scss";

import { getData } from "../../utils/storage.js";

import { formatToDays } from "../../utils/date.js";

import { modes } from "../../utils/modes.js";

import { toQueryString } from "../../utils/url.js";

export default function HomeLink() {
  const data = getData();
  const loaded = data.loaded;

  const key = loaded.key;
  const gameMode = loaded.gameMode || modes.daily;

  const search =
    gameMode === modes.archive || gameMode === modes.practice
      ? (search = toQueryString(gameMode, loaded.key))
      : null;

  return (
    <div className={styles.nav}>
      <Link to={{ pathname: "/", search }}>&#x276E; home</Link>
    </div>
  );
}

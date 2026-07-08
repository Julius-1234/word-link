import { Link } from "react-router-dom";

import styles from "./HomeLink.module.scss";

export default function HomeLink() {
  return (
    <div className={styles.nav}>
      <Link to="/">&#x276E; home</Link>
    </div>
  );
}

import styles from "./HomeHeader.module.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function HomeHeader() {
  return (
    <header className={styles.homeHeader}>
      <img src={logo} alt="WORD LINK" className={styles.logo} />
      <div className={styles.homeHeaderNav}>
        <Link to="/help">help</Link>
        <Link to="/credits">credits</Link>
        <Link to="/settings">settings</Link>
      </div>
    </header>
  );
}

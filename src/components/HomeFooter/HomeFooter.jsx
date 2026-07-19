import styles from "./HomeFooter.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGame } from "../../game/GameEngine";

export default function HomeFooter() {
  const { clearPath } = useGame();
  const clear = "clear all";
  const confirm = "confirm?";
  const [clearStatus, setClearStatus] = useState(clear);
  const onClick = () => {
    if (clearStatus === clear) setClearStatus(confirm);
    else {
      clearPath();
      setClearStatus(clear);
    }
  };
  const onBlur = () => setClearStatus(clear);

  return (
    <footer className={styles.homeFooter}>
      <Link to="/stats">stats</Link>
      <div
        className={styles.clearPath}
        tabIndex={0}
        onClick={onClick}
        onBlur={onBlur}
      >
        {clearStatus}
      </div>
    </footer>
  );
}

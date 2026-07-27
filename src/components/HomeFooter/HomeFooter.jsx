import styles from "./HomeFooter.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGame } from "../../game/GameEngine";
import ConfirmSequence from "../ConfirmSequence/ConfirmSequence.jsx";

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
      <ConfirmSequence
        sequence={["clear", "confirm?"]}
        func={clearPath}
        className={styles.clearPath}
      />
    </footer>
  );
}

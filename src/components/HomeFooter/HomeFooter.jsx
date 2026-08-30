import styles from "./HomeFooter.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGame } from "../../game/GameEngine";
import ConfirmSequence from "../ConfirmSequence/ConfirmSequence.jsx";

export default function HomeFooter() {
  const { clearPath, clearWord } = useGame();

  return (
    <footer className={styles.homeFooter}>
      <Link to="/stats">stats</Link>
      <ConfirmSequence
        sequence={[
          ["clear", clearWord],
          ["clear all", clearPath],
        ]}
        className={styles.clearPath}
      />
    </footer>
  );
}

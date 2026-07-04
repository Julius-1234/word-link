import styles from "./Game.module.scss";

import { useEffect, useState } from "react";

export default function Game({ path, start, end, guess }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollBottom, setScrollBottom] = useState(0);
  const words = path?.map((word) => {
    return (
      <div key={word} className={styles.gamePathWord}>
        {word}
      </div>
    );
  });
  const last = words?.pop();

  const checkForChanges = () => {
    const box = document.querySelector(`.${styles.scrollingGroup}`);
    setScrollTop(box.scrollTop);
    setScrollBottom(box.scrollHeight - box.scrollTop - box.clientHeight);
  };
  useEffect(() => {
    checkForChanges();
  }, []);
  return (
    <div className={styles.gameBox}>
      <div className={styles.gameStartWord}>{start}</div>
      <div
        className={`${styles.scrollingGroup} scrollbar-styles ${scrollTop > 1 ? styles.scrollingTop : ""} ${scrollBottom > 0 ? styles.scrollingBottom : ""}`}
        onScroll={checkForChanges}
      >
        {words}
      </div>
      {last}
      <div className={styles.gameInput}>{guess}</div>
      <div className={styles.gameEndWord}>{end}</div>
    </div>
  );
}

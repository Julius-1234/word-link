import styles from "./Game.module.scss";

import ShadowScrollBox from "../ShadowScrollBox/ShadowScrollBox";

export default function Game({ path, start, end, guess }) {
  const words = path?.map((word) => {
    return (
      <div key={word} className={styles.gamePathWord}>
        {word}
      </div>
    );
  });
  const last = words?.pop();
  return (
    <div className={styles.gameBox}>
      <div className={styles.gameStartWord}>{start}</div>
      <ShadowScrollBox classNames={styles.scrollingGroup}>
        {words}
      </ShadowScrollBox>
      {last}
      <div className={styles.gameInput}>{guess}</div>
      <div className={styles.gameEndWord}>{end}</div>
    </div>
  );
}

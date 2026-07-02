import { useEffect, useState } from "react";
import styles from "./MessageDisplay.module.scss";

export default function MessageDisplay({ data }) {
  return (
    <div className={styles.errors}>
      {data.toReversed().map((error, i) => (
        <div className={styles[error.type]} key={i}>
          {error.message}
        </div>
      ))}
    </div>
  );
}

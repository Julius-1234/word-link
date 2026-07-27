import { useState } from "react";
import styles from "./ConfirmSequence.module.scss";

export default function ({ sequence, func, className }) {
  const [status, setStatus] = useState(0);
  const len = sequence.length - 1;
  const onClick = () => {
    if (status === len) {
      func();
      setStatus(0);
    } else {
      setStatus(status + 1);
    }
  };
  const onBlur = () => {
    setStatus(0);
  };
  return (
    <div
      className={`${styles.holder} ${className ? className : ""}`}
      onClick={onClick}
      onBlur={onBlur}
    >
      {sequence[status]}
    </div>
  );
}

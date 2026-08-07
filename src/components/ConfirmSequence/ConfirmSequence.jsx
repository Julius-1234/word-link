import { useState } from "react";

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
    <span className={className} onClick={onClick} onBlur={onBlur} tabIndex={0}>
      {sequence[status]}
    </span>
  );
}

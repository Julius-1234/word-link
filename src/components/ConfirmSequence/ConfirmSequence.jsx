import { useEffect, useState } from "react";

export default function ({ sequence, className }) {
  const [status, setStatus] = useState(0);
  const len = sequence.length - 1;

  const onClick = () => {
    if (status === len) setStatus(0);
    else setStatus(status + 1);
    const statusPair = sequence[status];
    if (statusPair.length < 2) return;
    const func = statusPair[1];
    func();
  };

  const onBlur = () => {
    setStatus(0);
  };

  return (
    <span className={className} onClick={onClick} onBlur={onBlur} tabIndex={0}>
      {sequence[status][0]}
    </span>
  );
}

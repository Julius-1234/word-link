import { useEffect, useState } from "react";
import "./Messages.css";

const errorsMax = 5;

export default function Errors({ data }) {
  const [errors, setErrors] = useState([]);
  const message = data.message;
  useEffect(() => {
    if (message) {
      setErrors((prev) => [data, ...prev].slice(0, errorsMax));

      setTimeout(() => {
        setErrors((prev) => prev.slice(0, -1));
      }, 2000);
    }
  }, [data]);

  return (
    <div className="errors">
      {errors.toReversed().map((error, i) => (
        <div className={error.type} key={i}>
          {error.message}
        </div>
      ))}
    </div>
  );
}

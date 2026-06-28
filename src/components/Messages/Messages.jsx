import { useEffect, useState } from "react";
import "./Messages.css";

export default function Errors({ data }) {
  return (
    <div className="errors">
      {data.toReversed().map((error, i) => (
        <div className={error.type} key={i}>
          {error.message}
        </div>
      ))}
    </div>
  );
}

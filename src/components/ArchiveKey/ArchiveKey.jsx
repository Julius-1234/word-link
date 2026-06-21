import "./ArchiveKey.css";
import { difficultyInfo } from "../../utils/constants.js";

export default function ArchiveKey() {
  return (
    <div className="archiveKey">
      {Object.values(difficultyInfo.difficulties).map((difficulty, i) => (
        <div key={i} className="difficultyKey">
          <div
            className="difficultyKeyColour"
            style={{ backgroundColor: difficulty.beatenColour }}
          />
          = completed
          <div className="difficultyKeyName">{difficulty.displayName}</div>
        </div>
      ))}
    </div>
  );
}

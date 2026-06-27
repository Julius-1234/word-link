import "./ArchiveKey.css";
import { difficultyInfo } from "../../utils/constants.js";

export default function ArchiveKey() {
  return (
    <div className="archive-key">
      {Object.values(difficultyInfo.difficulties).map((difficulty, i) => (
        <div key={i} className="difficulty-key">
          <div
            className="difficulty-key-colour"
            style={{ backgroundColor: difficulty.beatenColour }}
          />
          = completed
          <div className="difficulty-key-name">{difficulty.displayName}</div>
        </div>
      ))}
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import "./GameMode.css";

export default function GameMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const archiveDate = urlParams.get("archive");
  const navigate = useNavigate();
  const changeHandler = (value) => {
    if (value === "daily") {
      navigate("/");
    } else {
      navigate("/archive");
    }
  };
  return (
    <div className="game-info-select">
      <div className="game-info-select-selected">
        {archiveDate ? "archive" : "daily"} &#x25BE;
      </div>
      <div
        className="game-info-select-option"
        onClick={() => {
          const value = !archiveDate ? "archive" : "daily";
          changeHandler(value);
        }}
      >
        {!archiveDate ? "archive" : "daily"}
      </div>
    </div>
  );
}

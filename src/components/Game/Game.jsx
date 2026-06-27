import "./Game.css";
import { useNavigate } from "react-router-dom";
export default function Game({ path, start, end, guess, maxGuesses, date }) {
  const urlParams = new URLSearchParams(window.location.search);
  const archiveDate = urlParams.get("archive");
  const navigate = useNavigate();
  const changeHandler = (e) => {
    if (e.target.value === "daily") {
      navigate("/");
    } else {
      navigate("/archive");
    }
  };
  return (
    <>
      <div className="game-info">
        <select className="game-info-select" onChange={changeHandler}>
          <option value="daily" selected={!archiveDate} hidden={!archiveDate}>
            daily
          </option>
          <option
            value="archive"
            selected={!!archiveDate}
            hidden={!!archiveDate}
          >
            archive
          </option>
        </select>
        <div className="game-info-date">
          {date
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            : ""}
        </div>
      </div>
      <div className="game-box">
        <div className="game-start-word">{start}</div>
        {path?.map((word) => {
          return (
            <div key={word} className="game-path-word">
              {word}
            </div>
          );
        })}
        <div className="game-input">{guess}</div>
        <div className="game-end-word">{end}</div>
      </div>
    </>
  );
}

import { useNavigate } from "react-router-dom";
import styles from "./GameMode.module.scss";

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
    <div className={styles.gameInfoSelect}>
      <div className={styles.gameInfoSelectSelected}>
        {archiveDate ? "archive" : "daily"} &#x25BE;
      </div>
      <div
        className={styles.gameInfoSelectOption}
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

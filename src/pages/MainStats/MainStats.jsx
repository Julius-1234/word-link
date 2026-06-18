import GameStats from "../../components/GameStats/GameStats.jsx";
import AllStats from "../../components/AllStats/AllStats.jsx";
import { Link } from "react-router-dom";

import "./MainStats.css";

export default function MainStats() {
  const date = new Date();
  return (
    <>
      <div className="mainStatsNav">
        <Link to="/">&#x276E; home</Link>
      </div>
      <div className="allStatsTitle">All Stats</div>
      <AllStats />
      <div className="gameStatsTitle">Current Game Stats</div>
      <GameStats date={date.getTime()} />
    </>
  );
}

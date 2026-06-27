import GameStats from "../../components/GameStats/GameStats.jsx";
import AllStats from "../../components/AllStats/AllStats.jsx";
import { Link } from "react-router-dom";

import "./MainStats.css";

export default function MainStats() {
  const date = new Date();
  return (
    <>
      <div className="main-stats-nav">
        <Link to="/">&#x276E; home</Link>
      </div>
      <div className="all-stats-title">All Stats</div>
      <AllStats />
      <div className="game-stats-title">Current Game Stats</div>
      <GameStats date={date.getTime()} />
    </>
  );
}

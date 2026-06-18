import "./Head.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
export default function Head() {
  return (
    <header className="head">
      <img src={logo} alt="WORD LINK" className="logo" />
      <div className="home-nav">
        <Link to="/help">help</Link>
        <Link to="/stats">stats</Link>
        <Link to="/settings">settings</Link>
      </div>
    </header>
  );
}

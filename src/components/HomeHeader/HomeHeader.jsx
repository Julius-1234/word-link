import "./HomeHeader.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function HomeHeader() {
  return (
    <header className="Home-header">
      <img src={logo} alt="WORD LINK" className="logo" />
      <div className="Home-header-nav">
        <Link to="/help">help</Link>
        <Link to="/credits">credits</Link>
        <Link to="/settings">settings</Link>
      </div>
    </header>
  );
}

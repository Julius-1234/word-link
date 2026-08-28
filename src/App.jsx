import Home from "./pages/Home/Home.jsx";
import Stats from "./pages/Stats/Stats.jsx";
import Credits from "./pages/Credits/Credits.jsx";
import Archive from "./pages/Archive/Archive.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Help from "./pages/Help/Help.jsx";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </>
  );
}

import Home from "./pages/Home/Home.jsx";
import MainStats from "./pages/MainStats/MainStats.jsx";
import Credits from "./pages/Credits/Credits.jsx";
import Archive from "./pages/Archive/Archive.jsx";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<MainStats />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </>
  );
}

import Home from "./pages/Home/Home.jsx";
import MainStats from "./pages/MainStats/MainStats.jsx";

import "./App.css";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<MainStats />} />
      </Routes>
    </div>
  );
}

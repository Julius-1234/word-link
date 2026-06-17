import Home from "./Home.jsx";
import MainStats from "./MainStats.jsx";

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

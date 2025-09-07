// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapPage from "./pages/MapPage";
import DashboardPage from "./pages/DashboardPage";
import Alerts from "./pages/Alerts";
import Trends from "./pages/Trends";
import About from "./pages/About";
import Navbar from "./assets/layout/Navbar"; // imported
import HomePage from "./pages/HomePage";
import RockfallContour from "./components/Contour3D";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/about" element={<About />} />
            <Route path="/contour" element={<RockfallContour />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 text-center py-3 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Rockfall Prediction System
        </footer>
      </div>
    </Router>
  );
}

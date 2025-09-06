// src/Layout/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-indigo-900 to-blue-900 sticky top-0 z-50 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo / Title */}
      <h1 className="font-bold text-xl tracking-wide">
        Rockfall Prediction System
      </h1>

      {/* Navigation */}
      <nav className="space-x-6">
        <Link
          to="/"
          className="hover:text-yellow-400 cursor-pointer transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/map"
          className="hover:text-yellow-400 cursor-pointer transition duration-200"
        >
          Map
        </Link>
        <Link
          to="/dashboard"
          className="hover:text-yellow-400 cursor-pointer transition duration-200"
        >
          Dashboard
        </Link>
        <Link
          to="/alerts"
          className="hover:text-yellow-400 cursor-pointer transition duration-200"
        >
          Alerts
        </Link>
        <Link
          to="/trends"
          className="hover:text-yellow-400 cursor-pointer transition duration-200"
        >
          Trends
        </Link>
        <Link
          to="/about"
          className="hover:text-yellow-400 cursor-pointer transition duration-200"
        >
          About
        </Link>
      </nav>
    </header>
  );
}

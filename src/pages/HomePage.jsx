// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

const mockChartData = [
  { time: "08:00", risk: 20 },
  { time: "10:00", risk: 30 },
  { time: "12:00", risk: 45 },
  { time: "14:00", risk: 60 },
  { time: "16:00", risk: 55 },
  { time: "18:00", risk: 70 },
  { time: "20:00", risk: 80 },
];

export default function HomePage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ⛏️ AI Rockfall Prediction Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Know what’s happening in your mining region with smart predictions and real-time insights.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Signup
          </Link>
        </div>
      </div>

      {/* Chart / Illustration Section */}
      <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Left: Sample chart */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">
            Example Risk Pattern
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Image/Illustration */}
        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <img
            src="https://media.istockphoto.com/id/494809336/photo/goldmine-of-kalgoorlie.jpg?s=2048x2048&w=is&k=20&c=I5A20d9xBH29Ghcnzpl4IKQRX6g9v0lATUFEc_QtuJA="
            alt="Mining region"
            className="rounded-lg mb-4"
          />
          <p className="text-gray-600 text-sm text-center">
            Visualizing mining zones helps track stability and predict risks effectively.
          </p>
        </div>
      </div>
    </div>
  );
}

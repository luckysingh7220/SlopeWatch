// src/pages/Trends.jsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const mockData = [
  { time: "08:00", Zone1: 20, Zone2: 40, Rainfall: 5 },
  { time: "10:00", Zone1: 30, Zone2: 35, Rainfall: 10 },
  { time: "12:00", Zone1: 45, Zone2: 25, Rainfall: 20 },
  { time: "14:00", Zone1: 60, Zone2: 40, Rainfall: 15 },
  { time: "16:00", Zone1: 55, Zone2: 50, Rainfall: 18 },
  { time: "18:00", Zone1: 70, Zone2: 65, Rainfall: 25 },
  { time: "20:00", Zone1: 80, Zone2: 60, Rainfall: 30 },
];

// Mock distribution of risk levels
const riskDistribution = [
  { name: "High Risk", value: 35 },
  { name: "Medium Risk", value: 45 },
  { name: "Low Risk", value: 20 },
];

const COLORS = ["#dc2626", "#facc15", "#22c55e"]; // red, yellow, green

export default function Trends() {
  const [selectedZone, setSelectedZone] = useState("Zone1");

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800">📊 Rockfall Risk Trends</h2>

      {/* Zone selector */}
      <div className="flex items-center gap-3">
        <label className="font-medium text-gray-700">Select Zone:</label>
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Zone1">Zone 1</option>
          <option value="Zone2">Zone 2</option>
        </select>
      </div>

      {/* Risk chart */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold mb-4 text-blue-600">
          {selectedZone} Risk Over Time
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              label={{ value: "Risk %", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedZone}
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Rainfall vs Risk chart */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold mb-4 text-emerald-600">
          🌧️ Rainfall vs Rockfall Risk
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Rainfall"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Zone1"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Zone2"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Risk distribution pie chart */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-purple-600">
          ⚠️ Risk Level Distribution
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={riskDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={120}
              dataKey="value"
            >
              {riskDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

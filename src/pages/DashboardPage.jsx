// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for multiple zones
const mockData = {
  Zone1: [
    { time: "10:00", rainfall: 12, vibration: 3 },
    { time: "11:00", rainfall: 20, vibration: 5 },
    { time: "12:00", rainfall: 8, vibration: 2 },
    { time: "13:00", rainfall: 30, vibration: 6 },
    { time: "14:00", rainfall: 15, vibration: 4 },
  ],
  Zone2: [
    { time: "10:00", rainfall: 5, vibration: 1 },
    { time: "11:00", rainfall: 12, vibration: 2 },
    { time: "12:00", rainfall: 18, vibration: 5 },
    { time: "13:00", rainfall: 25, vibration: 7 },
    { time: "14:00", rainfall: 20, vibration: 6 },
  ],
};

export default function DashboardPage() {
  const [selectedZone, setSelectedZone] = useState("Zone1");

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800">📊 Dashboard</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 shadow rounded-lg p-4 border border-red-200">
          <h3 className="text-gray-600 text-sm">High Risk Zones</h3>
          <p className="text-2xl font-semibold text-red-600">2</p>
        </div>
        <div className="bg-blue-50 shadow rounded-lg p-4 border border-blue-200">
          <h3 className="text-gray-600 text-sm">Active Sensors</h3>
          <p className="text-2xl font-semibold text-blue-600">5</p>
        </div>
        <div className="bg-yellow-50 shadow rounded-lg p-4 border border-yellow-200">
          <h3 className="text-gray-600 text-sm">Last Alert</h3>
          <p className="text-lg font-semibold text-yellow-600">Today 13:20</p>
        </div>
      </div>

      {/* Zone selector */}
      <div className="flex items-center space-x-3">
        <label htmlFor="zone" className="font-medium text-gray-700">
          Select Zone:
        </label>
        <select
          id="zone"
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="Zone1">Zone 1</option>
          <option value="Zone2">Zone 2</option>
        </select>
      </div>

      {/* Line chart */}
      <div className="bg-white shadow rounded-lg p-4 h-96">
        <h3 className="text-gray-700 mb-4 font-medium">
          Rainfall vs Vibration ({selectedZone})
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData[selectedZone]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rainfall" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="vibration" stroke="#dc2626" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

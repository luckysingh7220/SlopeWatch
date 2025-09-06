// src/pages/Alerts.jsx
import React, { useState } from "react";

// mock alerts (frontend only)
const mockAlerts = [
  { id: 1, zone: "Z1", severity: "High", time: "2025-09-07 14:32", message: "Unstable slope detected", status: "Active" },
  { id: 2, zone: "Z2", severity: "Medium", time: "2025-09-07 13:05", message: "Minor soil shift observed", status: "Active" },
  { id: 3, zone: "Z1", severity: "Low", time: "2025-09-06 19:44", message: "Sensor maintenance required", status: "Resolved" },
  { id: 4, zone: "Z3", severity: "High", time: "2025-09-05 16:20", message: "Strong vibration patterns detected", status: "Resolved" },
];

const getSeverityColor = (severity) => {
  switch (severity) {
    case "High": return "bg-red-100 text-red-700 border-red-400";
    case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-400";
    case "Low": return "bg-green-100 text-green-700 border-green-400";
    default: return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Active": return "bg-red-50 text-red-600 border-red-300";
    case "Resolved": return "bg-green-50 text-green-600 border-green-300";
    default: return "bg-gray-100 text-gray-600 border-gray-300";
  }
};

export default function Alerts() {
  const [filter, setFilter] = useState("All");

  const filteredAlerts = filter === "All" 
    ? mockAlerts 
    : mockAlerts.filter((a) => a.severity === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Recent Alerts</h2>
        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        >
          <option value="All">All Severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md shadow-sm bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left border-b">Zone</th>
              <th className="p-3 text-left border-b">Severity</th>
              <th className="p-3 text-left border-b">Time</th>
              <th className="p-3 text-left border-b">Message</th>
              <th className="p-3 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{alert.zone}</td>
                <td className="p-3 border-b">
                  <span className={`px-2 py-1 text-sm rounded border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="p-3 border-b">{alert.time}</td>
                <td className="p-3 border-b">{alert.message}</td>
                <td className="p-3 border-b">
                  <span className={`px-2 py-1 text-sm rounded border ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredAlerts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No alerts found for selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

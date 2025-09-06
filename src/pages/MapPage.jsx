import React, { useState } from "react";
import MapView from "../components/MapView";
import { ZONES } from "../data/mockData";

export default function MapPage() {
  const [selectedZoneId, setSelectedZoneId] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Risk Map</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Map Section */}
        <div className="md:w-3/4 bg-white rounded-lg shadow p-4">
          <MapView height="70vh" selectedZoneId={selectedZoneId} />
        </div>

        {/* Sidebar */}
        <aside className="md:w-1/4 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-3">Zones</h3>
          <ul className="space-y-2">
            {ZONES.map((z) => (
              <li key={z.id}>
                <button
                  onClick={() => setSelectedZoneId(z.id)}
                  className={`w-full text-left p-2 rounded border transition ${
                    selectedZoneId === z.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium">{z.id}</span>{" "}
                  <span
                    className={`ml-2 font-semibold ${
                      z.probability > 0.7
                        ? "text-red-600"
                        : z.probability > 0.4
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {(z.probability * 100).toFixed(0)}%
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

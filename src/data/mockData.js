// src/data/mockData.js
export const SITE = {
    id: "site_redridge",
    name: "Redridge Open-Pit",
    center: [22.5726, 88.3639] // lat,lng example
  };
  
  export const SENSORS = [
    { id: "s1", type: "inclinometer", coords: [22.5736,88.3645], lastValue: 3.4, lastSeen: "2025-09-05T10:21:00Z" },
    { id: "s2", type: "piezometer", coords: [22.5718,88.3621], lastValue: 0.92, lastSeen: "2025-09-05T10:19:00Z" }
  ];
  
  // Risk zones as GeoJSON-ish (simplified)
  export const ZONES = [
    { id: "z1", probability: 0.88, geojson: { type: "Polygon", coordinates: [[[88.362,22.571],[88.365,22.571],[88.365,22.573],[88.362,22.573],[88.362,22.571]]] } },
    { id: "z2", probability: 0.42, geojson: { type: "Polygon", coordinates: [[[88.364,22.574],[88.366,22.574],[88.366,22.575],[88.364,22.575]]] } }
  ];
  
  export const ALERTS = [
    { id: "a1", zoneId: "z1", severity: "critical", probability: 0.92, createdAt: "2025-09-05T10:30:00Z", message: "Rapid displacement detected in Sector C" }
  ];
  
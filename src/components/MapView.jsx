// src/components/MapView.jsx
import React, { useRef, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../utils/leafletIconFix";
import HeatmapLayer from "./HeatmapLayer";
import {
  zonesToHeatPoints,
  zonesToFeatureCollection,
  polygonCentroid,
} from "../utils/heatmapHelpers";
import { SITE, SENSORS, ZONES } from "../data/mockData";

// --- Custom sensor icons ---
const sensorIcons = {
  rainfall: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/414/414974.png",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  }),
  vibration: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/833/833524.png",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  }),
  default: new L.Icon.Default(),
};

// --- Legend Component ---
function Legend() {
  const map = useMap();

  useEffect(() => {
    const getColor = (p) => {
      if (p >= 0.85) return "#991b1b";
      if (p >= 0.65) return "#e53e3e";
      if (p >= 0.45) return "#f59e0b";
      if (p >= 0.25) return "#fbbf24";
      return "#16a34a";
    };

    const legend = L.control({ position: "bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend bg-white p-2 rounded shadow");
      const grades = [0, 0.25, 0.45, 0.65, 0.85];
      let labels = "<h4 class='text-sm font-semibold mb-1'>Risk Level</h4>";
      for (let i = 0; i < grades.length; i++) {
        const next = grades[i + 1];
        labels +=
          '<div><i style="background:' +
          getColor(grades[i] + 0.01) +
          ';width:14px;height:14px;display:inline-block;margin-right:6px;border-radius:2px"></i>' +
          grades[i] * 100 +
          (next ? "&ndash;" + next * 100 + "%" : "%+") +
          "</div>";
      }
      div.innerHTML = labels;
      return div;
    };
    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

export default function MapView({ height = "70vh", selectedZoneId = null }) {
  const mapRef = useRef(null);

  // Convert data
  const featureCollection = useMemo(() => zonesToFeatureCollection(ZONES), []);
  const heatPoints = useMemo(() => zonesToHeatPoints(ZONES), []);

  const getColor = (p) => {
    if (p >= 0.85) return "#991b1b";
    if (p >= 0.65) return "#e53e3e";
    if (p >= 0.45) return "#f59e0b";
    if (p >= 0.25) return "#fbbf24";
    return "#16a34a";
  };

  const styleFeature = (feature) => ({
    color: "#111",
    weight: 1,
    fillColor: getColor(feature.properties.probability),
    fillOpacity: 0.45,
    dashArray: "0",
  });

  const onEachFeature = (feature, layer) => {
    const probPct = Math.round((feature.properties.probability || 0) * 100);
    const popupContent = `
      <div style="font-family:sans-serif;font-size:14px">
        <div style="font-weight:600;color:#111">Zone ${feature.properties.id}</div>
        <div style="margin-top:4px">Probability: 
          <span style="color:${getColor(feature.properties.probability)}">${probPct}%</span>
        </div>
      </div>`;
    layer.bindPopup(popupContent, { maxWidth: 240 });

    layer.on({
      mouseover: () => {
        layer.setStyle({ weight: 3, fillOpacity: 0.6 });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
      },
      mouseout: () => {
        layer.setStyle({ weight: 1, fillOpacity: 0.45 });
      },
      click: () => {
        const coords = feature.geometry.coordinates[0];
        const [lng, lat] = polygonCentroid(coords);
        if (mapRef.current) mapRef.current.flyTo([lat, lng], 16, { duration: 0.8 });
        layer.openPopup();
      },
    });
  };

  // Focus when zone is selected from sidebar
  useEffect(() => {
    if (!selectedZoneId || !mapRef.current) return;
    const zone = ZONES.find((z) => z.id === selectedZoneId);
    if (!zone) return;
    const coords = zone.geojson.coordinates[0];
    const [lng, lat] = polygonCentroid(coords);
    mapRef.current.flyTo([lat, lng], 16, { duration: 0.8 });
  }, [selectedZoneId]);

  return (
    <div
      style={{ height }}
      className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200"
    >
      <MapContainer
        center={SITE.center}
        zoom={14}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Base tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Zones */}
        <GeoJSON
          data={featureCollection}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />

        {/* Sensor markers */}
        {SENSORS.map((s) => (
          <Marker
            key={s.id}
            position={s.coords}
            icon={sensorIcons[s.type] || sensorIcons.default}
          >
            <Popup>
              <div className="text-sm">
                <strong>{s.type}</strong>
                <br />
                Value: {s.lastValue}
                <br />
                Last seen: {new Date(s.lastSeen).toLocaleString()}
              </div>
            </Popup>
            <Tooltip>{s.type}</Tooltip>
          </Marker>
        ))}

        {/* Heatmap */}
        <HeatmapLayer
          points={heatPoints}
          options={{ radius: 30, blur: 20, maxZoom: 17 }}
        />

        {/* Legend */}
        <Legend />
      </MapContainer>
    </div>
  );
}

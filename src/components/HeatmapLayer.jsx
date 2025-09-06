// src/components/HeatmapLayer.jsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat'; // augments L with heatLayer

export default function HeatmapLayer({ points = [], options = {} }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !points || points.length === 0) return;

    // convert weights if needed: leaflet.heat expects [lat, lng, intensity]
    const heat = L.heatLayer(points, {
      radius: options.radius ?? 25,
      blur: options.blur ?? 15,
      maxZoom: options.maxZoom ?? 17,
      // max: options.max ?? 1,
      ...options
    });

    heat.addTo(map);

    return () => {
      try {
        map.removeLayer(heat);
      } catch (e) {
        // ignore if already removed
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, JSON.stringify(points), options.radius, options.blur, options.maxZoom]);

  return null;
}

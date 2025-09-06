// src/utils/heatmapHelpers.js
// helpers: convert your ZONES (with geojson & probability) -> heat points and FeatureCollection

export function zonesToHeatPoints(zones) {
    // returns [ [lat, lng, weight], ... ]
    const pts = [];
    zones.forEach(z => {
      // z.geojson.coordinates[0] assumed to be [ [lng,lat], ... ]
      const coords = z.geojson.coordinates[0];
      let sumLat = 0, sumLng = 0;
      coords.forEach(([lng, lat]) => { sumLat += lat; sumLng += lng; });
      const n = coords.length || 1;
      const lat = sumLat / n;
      const lng = sumLng / n;
      const weight = typeof z.probability === 'number' ? z.probability : 0.1; // 0..1
      pts.push([lat, lng, weight]);
    });
    return pts;
  }
  
  export function zonesToFeatureCollection(zones) {
    return {
      type: 'FeatureCollection',
      features: zones.map(z => ({
        type: 'Feature',
        properties: { id: z.id, probability: z.probability },
        geometry: z.geojson
      }))
    };
  }
  
  // good centroid calculation (returns [lng, lat])
  export function polygonCentroid(coords) {
    // coords: array of [lng,lat] points (closed polygon)
    if (!coords || !coords.length) return [0, 0];
    // shoelace formula
    let area = 0, cx = 0, cy = 0;
    for (let i = 0, len = coords.length - 1; i < len; i++) {
      const [x0, y0] = coords[i];
      const [x1, y1] = coords[i + 1];
      const a = x0 * y1 - x1 * y0;
      area += a;
      cx += (x0 + x1) * a;
      cy += (y0 + y1) * a;
    }
    area = area / 2;
    if (area === 0) {
      // degenerate polygon — fallback to average
      const sum = coords.reduce((acc, [lng, lat]) => ({lng: acc.lng + lng, lat: acc.lat + lat}), {lng:0, lat:0});
      return [sum.lng / coords.length, sum.lat / coords.length];
    }
    cx = cx / (6 * area);
    cy = cy / (6 * area);
    return [cx, cy]; // [lng, lat]
  }
  
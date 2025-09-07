// src/components/RockfallContour.jsx
import React from "react";
import Plot from "react-plotly.js";

const generateConeLikeContour = (size = 60) => {
  const X = [];
  const Y = [];
  const Z = [];

  const radius = 40;

  for (let i = 0; i < size; i++) {
    const rowX = [];
    const rowY = [];
    const rowZ = [];
    
    // Reverse theta so the base is at the top and tip at the bottom
    // theta from pi/2 (base at top) to 0 (tip at bottom)
    const theta = (1 - i / (size - 1)) * (Math.PI / 2);

    for (let j = 0; j < size; j++) {
      const phi = (j / (size - 1)) * 2 * Math.PI;

      // add some irregularity
      const noise = Math.random() * 3 - 1.5;

      // cone-like x, y
      const x = radius * Math.sin(theta) * Math.cos(phi) + noise;
      const y = radius * Math.sin(theta) * Math.sin(phi) + noise;

      // z goes from radius (base at top) to 0 (tip at bottom)
      const z = radius * Math.cos(theta) + noise;

      // risk: low near center, high near edges
      const risk =
        Math.exp(-((x ** 2 + y ** 2) / (2 * 400))) * 100 + Math.random() * 10;

      rowX.push(x);
      rowY.push(y);
      rowZ.push(risk);
    }

    X.push(rowX);
    Y.push(rowY);
    Z.push(rowZ);
  }

  return { X, Y, Z };
};

export default function RockfallContour() {
  const { X, Y, Z } = generateConeLikeContour(80);

  return (
    <Plot
      data={[
        {
          type: "surface",
          x: X,
          y: Y,
          z: Z,
          contours: {
            z: {
              show: true,
              usecolormap: true,
              highlightcolor: "#42f462",
              project: { z: true },
            },
          },
          colorscale: [
            [0, "#ffffb2"], // low risk light
            [0.5, "#fecc5c"],
            [0.7, "#fd8d3c"],
            [1, "#800026"], // high risk dark
          ],
          colorbar: { title: "Risk Level", titleside: "right" },
          lighting: {
            ambient: 0.6,
            diffuse: 0.8,
            roughness: 0.9,
            specular: 0.2,
          },
        },
      ]}
      layout={{
        title: "Rockfall Risk Contour (Cone with Base at Top)",
        width: 900,
        height: 750,
        scene: {
          xaxis: { title: "East-West (X)" },
          yaxis: { title: "North-South (Y)" },
          zaxis: { 
            title: "Risk Level",
            // Reverse the z-axis to put the base at the top
            autorange: 'reversed'
          },
          camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } },
        },
      }}
    />
  );
}
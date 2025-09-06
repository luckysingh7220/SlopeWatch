// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="p-8 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
          About the Project
        </h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          The <span className="font-semibold text-blue-700">Rockfall Prediction System</span> 
          is a prototype web application designed to{" "}
          <span className="font-medium">monitor, predict, and mitigate geological risks</span> 
          in vulnerable mining and hilly terrains. The goal is to provide{" "}
          <span className="italic">authorities, engineers, and researchers</span> with a reliable tool 
          for <span className="font-medium">decision support and disaster prevention</span>.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          The system combines{" "}
          <span className="font-semibold">AI/ML models</span> for predictive analytics, 
          <span className="font-semibold"> real-time IoT sensor data</span> for monitoring, 
          and <span className="font-semibold">geospatial visualization</span> for risk mapping. 
          Together, these features enable proactive identification of unstable zones 
          and timely alerts.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Built with modern web technologies including{" "}
          <span className="font-semibold">React, TailwindCSS, Leaflet</span> for interactive maps, 
          and <span className="font-semibold">Recharts</span> for data visualization, this prototype 
          demonstrates how digital solutions can play a key role in{" "}
          <span className="font-medium">sustainable and safe mining practices</span>.
        </p>

        {/* Know More Button */}
        <div className="text-center">
          <a
            href="https://github.com/Virtual-box-KA/SIH-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            🔗 Know More
          </a>
        </div>
      </div>
    </div>
  );
}

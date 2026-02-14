import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [metrics, setMetrics] = useState({});
  const [shapData, setShapData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/metrics")
      .then(res => setMetrics(res.data));

    axios.get("http://localhost:5000/shap")
      .then(res => setShapData(res.data));
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Explainable ML Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card title="Accuracy" value={metrics.accuracy} />
        <Card title="F1 Score" value={metrics.f1Score} />
        <Card title="ROC AUC" value={metrics.roc} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          SHAP Feature Importance
        </h2>
        <BarChart width={600} height={300} data={shapData}>
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="importance" fill="#4f46e5" />
        </BarChart>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl mt-2 text-indigo-600">
        {value}
      </p>
    </div>
  );
}

export default App;

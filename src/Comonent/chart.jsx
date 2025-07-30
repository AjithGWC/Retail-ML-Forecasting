import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "2023-10",
    "Cotton - Actual": 5000,
    "Cotton - Forecast": 4800,
    "Polyester - Actual": 1000,
    "Polyester - Forecast": 900,
    "Viscose - Actual": 200,
    "Viscose - Forecast": 180,
  },
  {
    name: "2023-11",
    "Cotton - Actual": 10000,
    "Cotton - Forecast": 9500,
    "Polyester - Actual": 1200,
    "Polyester - Forecast": 1100,
    "Viscose - Actual": 250,
    "Viscose - Forecast": 220,
  },
  {
    name: "2023-12",
    "Cotton - Actual": 16000,
    "Cotton - Forecast": 15500,
    "Polyester - Actual": 1500,
    "Polyester - Forecast": 1400,
    "Viscose - Actual": 300,
    "Viscose - Forecast": 280,
  },
  {
    name: "2024-01",
    "Cotton - Actual": 12000,
    "Cotton - Forecast": 11500,
    "Polyester - Actual": 1000,
    "Polyester - Forecast": 950,
    "Viscose - Actual": 220,
    "Viscose - Forecast": 200,
  },
  {
    name: "2024-02",
    "Cotton - Actual": 20000,
    "Cotton - Forecast": 19000,
    "Polyester - Actual": 1800,
    "Polyester - Forecast": 1700,
    "Viscose - Actual": 350,
    "Viscose - Forecast": 320,
  },
  {
    name: "2024-03",
    "Cotton - Actual": 18000,
    "Cotton - Forecast": 17500,
    "Polyester - Actual": 1600,
    "Polyester - Forecast": 1500,
    "Viscose - Actual": 300,
    "Viscose - Forecast": 280,
  },
  {
    name: "2024-04",
    "Cotton - Actual": 22000,
    "Cotton - Forecast": 21000,
    "Polyester - Actual": 2000,
    "Polyester - Forecast": 1900,
    "Viscose - Actual": 400,
    "Viscose - Forecast": 380,
  },
  {
    name: "2024-05",
    "Cotton - Actual": 15000,
    "Cotton - Forecast": 14500,
    "Polyester - Actual": 1300,
    "Polyester - Forecast": 1200,
    "Viscose - Actual": 280,
    "Viscose - Forecast": 250,
  },
  {
    name: "2024-06",
    "Cotton - Actual": 25000,
    "Cotton - Forecast": 24000,
    "Polyester - Actual": 2200,
    "Polyester - Forecast": 2100,
    "Viscose - Actual": 450,
    "Viscose - Forecast": 420,
  },
  {
    name: "2024-07",
    "Cotton - Actual": 17000,
    "Cotton - Forecast": 16500,
    "Polyester - Actual": 1400,
    "Polyester - Forecast": 1300,
    "Viscose - Actual": 320,
    "Viscose - Forecast": 300,
  },
  {
    name: "2024-08",
    "Cotton - Actual": 28000,
    "Cotton - Forecast": 27000,
    "Polyester - Actual": 2500,
    "Polyester - Forecast": 2400,
    "Viscose - Actual": 500,
    "Viscose - Forecast": 480,
  },
  {
    name: "2024-09",
    "Cotton - Actual": 20000,
    "Cotton - Forecast": 19500,
    "Polyester - Actual": 1800,
    "Polyester - Forecast": 1700,
    "Viscose - Actual": 380,
    "Viscose - Forecast": 350,
  },
  {
    name: "2024-10",
    "Cotton - Actual": 33000, // Peak
    "Cotton - Forecast": 32000,
    "Polyester - Actual": 2800,
    "Polyester - Forecast": 2700,
    "Viscose - Actual": 550,
    "Viscose - Forecast": 520,
  },
  {
    name: "2024-11",
    "Cotton - Actual": 28000,
    "Cotton - Forecast": 27000,
    "Polyester - Actual": 2500,
    "Polyester - Forecast": 2400,
    "Viscose - Actual": 500,
    "Viscose - Forecast": 480,
  },
  {
    name: "2024-12",
    "Cotton - Actual": 25000,
    "Cotton - Forecast": 24000,
    "Polyester - Actual": 2200,
    "Polyester - Forecast": 2100,
    "Viscose - Actual": 450,
    "Viscose - Forecast": 420,
  },
  {
    name: "2025-01",
    "Cotton - Actual": 27000,
    "Cotton - Forecast": 26000,
    "Polyester - Actual": 2400,
    "Polyester - Forecast": 2300,
    "Viscose - Actual": 480,
    "Viscose - Forecast": 450,
  },
  {
    name: "2025-02",
    "Cotton - Actual": 28000,
    "Cotton - Forecast": 27000,
    "Polyester - Actual": 2500,
    "Polyester - Forecast": 2400,
    "Viscose - Actual": 500,
    "Viscose - Forecast": 480,
  },
  {
    name: "2025-03",
    "Cotton - Actual": 27500,
    "Cotton - Forecast": 26500,
    "Polyester - Actual": 2450,
    "Polyester - Forecast": 2350,
    "Viscose - Actual": 490,
    "Viscose - Forecast": 460,
  },
  {
    name: "2025-04",
    "Cotton - Actual": 29000,
    "Cotton - Forecast": 28000,
    "Polyester - Actual": 2600,
    "Polyester - Forecast": 2500,
    "Viscose - Actual": 520,
    "Viscose - Forecast": 490,
  },
  {
    name: "2025-05",
    "Cotton - Actual": 28500,
    "Cotton - Forecast": 27500,
    "Polyester - Actual": 2550,
    "Polyester - Forecast": 2450,
    "Viscose - Actual": 510,
    "Viscose - Forecast": 480,
  },
  {
    name: "2025-06",
    "Cotton - Actual": 29500,
    "Cotton - Forecast": 28500,
    "Polyester - Actual": 2650,
    "Polyester - Forecast": 2550,
    "Viscose - Actual": 530,
    "Viscose - Forecast": 500,
  },
  {
    name: "2025-07",
    "Cotton - Actual": 28800,
    "Cotton - Forecast": 27800,
    "Polyester - Actual": 2580,
    "Polyester - Forecast": 2480,
    "Viscose - Actual": 515,
    "Viscose - Forecast": 485,
  },
];

const chart = () => {
  return (
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Cotton Lines */}
          <Line
            type="monotone"
            dataKey="Cotton - Actual"
            stroke="#8884d8" // A common blue/purple color
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Cotton - Forecast"
            stroke="#82ca9d" // A common green color
            strokeDasharray="5 5" // Dashed line for forecast
            strokeWidth={2}
          />

          {/* Polyester Lines */}
          <Line
            type="monotone"
            dataKey="Polyester - Actual"
            stroke="#ffc658" // A common orange/yellow color
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Polyester - Forecast"
            stroke="#ff7300" // A darker orange
            strokeDasharray="5 5"
            strokeWidth={2}
          />

          {/* Viscose Lines */}
          <Line
            type="monotone"
            dataKey="Viscose - Actual"
            stroke="#00C49F" // A common teal color
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Viscose - Forecast"
            stroke="#FFBB28" // A common yellow color
            strokeDasharray="5 5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default chart;

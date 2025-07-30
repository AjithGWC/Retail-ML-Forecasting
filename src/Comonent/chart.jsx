import React, { useEffect, useState } from "react";
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
import DomoApi from "../helper/DomoApi";

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  console.log("chartData", chartData);

  useEffect(() => {
    const fetchDemandOutputData = async () => {
      try {
        const queryOperators = "";
        const result = await DomoApi.getData("Demand_Output", queryOperators);
        console.log("Fetched Demand_Output Data:", result);

        const transformedData = transformDomoData(result);
        setChartData(transformedData);
      } catch (error) {
        console.error("Failed to fetch Demand_Output data:", error);
      }
    };

    fetchDemandOutputData();
  }, []);

  const transformDomoData = (data) => {
    const transformed = {};

    data.forEach((item) => {
      const date = item.x_axis ? new Date(item.x_axis) : null;
      console.log("date", date);

      if (!date) {
        console.warn("Skipping data point with invalid date:", item);
        return;
      }

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const monthYear = `${year}-${month}`;

      if (!transformed[monthYear]) {
        transformed[monthYear] = { name: monthYear };
      }

      const dataKey = `${item.Fabric} - ${item.Type}`;
      transformed[monthYear][dataKey] = parseFloat(item.Y_axis) || 0;
    });

    const sortedTransformedData = Object.values(transformed).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedTransformedData;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1000px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding: "1.5rem",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}
        >
          Monthly Demand Output by Fabric and Type
        </h2>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Cotton - Actual"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Cotton - Forecast"
                stroke="#82ca9d"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Polyester - Actual"
                stroke="#ffc658"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Polyester - Forecast"
                stroke="#ff7300"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Viscose - Actual"
                stroke="#00C49F"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Viscose - Forecast"
                stroke="#FFBB28"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ textAlign: "center", color: "#777" }}>
            Loading chart data or no data available...
          </p>
        )}
      </div>
    </div>
  );
};

export default Chart;

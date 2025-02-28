"use client"; // Required for client-side interactivity

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function FinanceCharts() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Contributions",
        data: [2000, 4000, 6000, 8000, 10000, 12000],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Payouts",
        data: [0, 0, 0, 0, 40000, 40000],
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Contributions and Payouts",
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line data={data} options={options} />
    </div>
  );
}
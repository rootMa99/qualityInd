import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = (p) => {
  const data = {
    labels: p.data.map((m) => m.name),
    datasets: [
      {
        label: "OK",
        data: p.data.map((m) => m.ok),
        backgroundColor: ["#006B63"],
      },
      {
        label: "N/D",
        data: p.data.map((m) => m.na),
        backgroundColor: ["#FFA211"],
      },
      {
        label: "NOK",
        data: p.data.map((m) => m.nok),
        backgroundColor: ["#CF3335"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "white",
          fontWeight: "bold",
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "#f3f3f34f",
        },
        ticks: {
          display: p.home === undefined ? false : true,
          color: "white",
          fontWeight: "bold",
        },
        y: {
          stacked: true,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FAF0E6",
        },
        display: true,
      },
      datalabels: {
        display: true,
      },
    },
    animation: {
      onComplete: (animation) => {
        const { chart } = animation;
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          meta.data.forEach((element, index) => {
            const data = `${dataset.data[index]}`;
            if (data > 0) {
              let xPos = element.x;
              let yPos = element.y + element.height / 2;
              ctx.save();
              ctx.textAlign = "center";
              ctx.fillStyle = "#FFFAD7";
              ctx.font = "17px Arial";
              ctx.fillText(data, xPos, yPos);
            }
            ctx.restore();
          });
        });
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackedBarChart;

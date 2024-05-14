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
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80],
        backgroundColor: ["#006B63"],
      },
      {
        label: "Dataset 2",
        data: [28, 48, 40],
        backgroundColor: ["#FFA211"],
      },
      {
        label: "Dataset 3",
        data: [35, 41, 37],
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
        display: false,
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
            let xPos = element.x;
            let yPos = element.y + element.height / 2;
            ctx.save();
            ctx.textAlign = "center";
            ctx.fillStyle = "#FFFAD7";
            ctx.font = "17px Arial";
            ctx.fillText(data, xPos, yPos);
            ctx.restore();
          });
        });
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackedBarChart;

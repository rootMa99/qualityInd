import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

const BarChart = (p) => {
  const dataGap = {
    labels: ["OK", "NOK", "N/D"],
    datasets: [
      {
        type: "bar",
        label: "Actual",
        data: [p.data.ok, p.data.nok, p.data.na],
        backgroundColor: ["#006B63", "#CF3335", "#FFA211"],
        borderColor: "#F84018",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "white",
          fontWeight: "bold",
        },
      },
      y: {
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
    animation: p.home === undefined && {
      onComplete: (animation) => {
        const { chart } = animation;
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, index) => {
          const meta = chart.getDatasetMeta(index);
          meta.data.forEach((element, index) => {
            // const data = `${dataset.data[index]}%`;
            const data = `${dataset.data[index]}`;
            let xPos, yPos;
            if (dataset.type === "bar") {
              xPos = element.x;
              yPos = element.y + element.height / 2;
            } else if (dataset.type === "line") {
              xPos = element.x;
              yPos = element.y - 20;
            }
            ctx.save();
            ctx.textAlign = "center";
            ctx.fillStyle = dataset.type === "bar" ? "#FFFAD7" : "#EEEEEE";
            ctx.font = "17px Arial";
            ctx.fillText(data, xPos, yPos);
            ctx.restore();
          });
        });
      },
    },
  };
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    BarElement
  );

  return <Bar data={dataGap} options={options} />;
};

export default BarChart;

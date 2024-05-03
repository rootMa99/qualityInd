import c from "./Charts.module.css";
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
import React from "react";


const Charts = (p) => {
  const barChart = {
    labels: p.data.map((m) => m.cat),
    datasets: [
      {
        type: "bar",
        label: p.title,
        data: p.data.map((m) => (m.nbh).toFixed(1)),
        backgroundColor: "#b7d1cf",
        hoverBackgroundColor: "#929D96",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const data = {
    labels: p.data.map((m) => m.cat),
    datasets: [
      {
        type: "line",
        label: "Target",
        data: p.data.map((m) => (m.nbh).toFixed(1)),
        backgroundColor: "#F84018",
        pointHoverBorderColor: "#FAF0E6",
        borderColor: "#3BC6EB",
        fill: false,
        tension: 0.3,
        borderWidth: 3,
        borderCapStyle: "round",
        pointHoverBackgroundColor: "rgb(88, 3, 3)",
        pointHoverRadius: 8,
        pointBorderColor: "#3BC6EB",
        pointBorderWidth: 8,
        pointRadius: 1,
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
        display: true,
      },
      datalabels: {
        display: true,
      },
      // hover: {
      //   mode: "nearest",
      //   intersect: false,
      //   animationDuration: 400,
      // },
    },
    animation: p.home === undefined && {
      onComplete: (animation) => {
        const { chart } = animation;
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, index) => {
          const meta = chart.getDatasetMeta(index);
          meta.data.forEach((element, index) => {
            const data = dataset.data[index];

            let xPos, yPos;
            if (dataset.type === "bar") {
              xPos = element.x;
              yPos = element.y - 5;
            } else if (dataset.type === "line") {
              xPos = element.x;
              yPos = element.y - 10;
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

  return (
    <div className={c.chartHolder}>
      <div className={c.title}>
        <span></span>
        <h3> {p.title} chart</h3>
        <span></span>
      </div>
      <React.Fragment>
        {p.type==="bar"&&<Bar data={barChart} options={options} />}
        {p.type==="line"&&<Line data={data} options={options} />}
      </React.Fragment>
    </div>
  );
};

export default Charts;

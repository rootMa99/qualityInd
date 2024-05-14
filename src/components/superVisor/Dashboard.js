import { useCallback, useEffect, useState } from "react";
import c from "./Dashboard.module.css";
import api from "../../service/api";
import { useSelector } from "react-redux";
import {
  colorBgCond,
  getChartAud,
  getChartCrewSV,
  getChartFamily,
  getChartProject,
} from "../hooks/hfunc";
import BarChart from "./BarChart";
import StackedBarChart from "./StackedBarChart";

const Dashboard = (p) => {
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const { isLoged } = useSelector((s) => s.login);

  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/result/?date=${today}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const d = await response.json();
      console.log("cl1:", d);
      setData(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token, today]);
  useEffect(() => {
    callback();
  }, [callback]);
  const d = getChartCrewSV(data);
  const dp = getChartProject(d);
  const df = getChartFamily(d);
  const da = getChartAud(data);
  console.log("cl2:", d);
  console.log("cl projetc", dp);
  console.log("cl family", df);
  console.log("cl family", da);
  return (
    <div className={c.container}>
      <div className={c.title}>
        <div className={c.line}></div>
        <h1>dashboard</h1>
      </div>
      <div className={c.inputD}>
        <h3>select date:</h3>
        <input
          type="date"
          value={today}
          onChange={(e) => setToday(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          pattern="yyyy-mm-dd"
        />
      </div>
      <div className={c.crewChartContainer}>
        <div className={c.title}>
          <h1>projects</h1>
        </div>
        {dp.map((m) => (
          <div className={c.chart} style={{ backgroundColor: colorBgCond(m) }}>
            <div className={c.title} style={{ marginBottom: "0.5rem" }}>
              <div className={c.line}></div>
              <h4>{m.project}</h4>
            </div>
            <BarChart data={m} />
          </div>
        ))}
      </div>
      <div className={c.crewChartContainer}>
        <div className={c.title}>
          <h1>family</h1>
        </div>
        {df.map((m) => (
          <div className={c.chart} style={{ backgroundColor: colorBgCond(m) }}>
            <div className={c.title} style={{ marginBottom: "0.5rem" }}>
              <div className={c.line}></div>
              <h4>{m.family}</h4>
            </div>
            <BarChart data={m} />
          </div>
        ))}
      </div>
      <div className={c.crewChartContainer} style={{ marginTop: "0.5rem" }}>
        <div className={c.title}>
          <h1>crews</h1>
        </div>
        {d.map((m) => (
          <div className={c.chart} style={{ backgroundColor: colorBgCond(m) }}>
            <div className={c.title} style={{ marginBottom: "0.5rem" }}>
              <div className={c.line}></div>
              <h4>{m.crew}</h4>
            </div>

            <BarChart data={m} />
          </div>
        ))}
      </div>
      <div className={c.crewChartContainer} style={{ marginTop: "0.5rem" }}>
        <div className={c.title}>
          <h1>auditors Statistics</h1>
        </div>
        <div
          className={c.chart}
          style={{ width: "90%", padding: 0, height: "25rem" }}
        >
          <StackedBarChart data={da} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

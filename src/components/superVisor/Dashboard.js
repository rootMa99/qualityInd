import { useCallback, useEffect, useState } from "react";
import c from "./Dashboard.module.css";
import api from "../../service/api";
import { useSelector } from "react-redux";
import { colorBgCond, getChartCrewSV } from "../hooks/hfunc";
import BarChart from "./BarChart";

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
      console.log(d);
      setData(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token, today]);
  useEffect(() => {
    callback();
  }, [callback]);
  const d = getChartCrewSV(data);
  console.log(d);
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
    </div>
  );
};

export default Dashboard;

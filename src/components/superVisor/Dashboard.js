import { useCallback, useEffect, useState } from "react";
import c from "./Dashboard.module.css";
import api from "../../service/api";
import { useSelector } from "react-redux";
import { getChartCrewSV } from "../hooks/hfunc";

const Dashboard = (p) => {
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData]=useState([])
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
      setData(d)
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token, today]);
  useEffect(() => {
    callback();
  }, [callback]);
  console.log(getChartCrewSV(data))
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
    </div>
  );
};

export default Dashboard;

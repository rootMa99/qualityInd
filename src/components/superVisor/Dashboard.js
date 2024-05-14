import { useState } from "react";
import c from "./Dashboard.module.css";

const Dashboard = (p) => {
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  console.log(today);
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

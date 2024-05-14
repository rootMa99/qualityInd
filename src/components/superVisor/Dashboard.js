import c from "./Dashboard.module.css";

const Dashboard = (p) => {
  return (
    <div className={c.container}>
      <div className={c.title}>
        <div className={c.line}></div>
        <h1>dashboard</h1>
      </div>
      <div className={c.inputD}>
        <h3>choosen date:</h3>
        <input type="date" />
      </div>
    </div>
  );
};

export default Dashboard;

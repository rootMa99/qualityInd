import { useCallback, useEffect, useState } from "react";
import c from "./Home.module.css";
import api from "../../service/api";
import { useSelector } from "react-redux";
import { getCurrentWeek } from "../hooks/hfunc";
const Home = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [control, setControl] = useState(false);
  const [tasks, setTasks]=useState([]);
  console.log(getCurrentWeek());
  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/planning?week=${getCurrentWeek()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
      setTasks(data[0].plans)
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <div className={c.container}>
      <ul className={c.underList}>
        {tasks.length>0 && tasks.map(m=><li
            style={
              control === m.crew
                ? { opacity: 1, borderBottom: "2px solid white" }
                : {}
            }
            onClick={(e) => setControl(m.crew)}
          >
            {m.crew}
          </li>) }
      </ul>
    </div>
  );
};
export default Home;

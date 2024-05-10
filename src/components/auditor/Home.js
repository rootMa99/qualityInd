import { useCallback, useEffect, useState } from "react";
import c from "./Home.module.css";
import api from "../../service/api";
import { useSelector } from "react-redux";
import { getCurrentWeek } from "../hooks/hfunc";
import Task from "./Task";
import erimg from "../../assets/404er.svg";


const Home = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [control, setControl] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [shiftf, setShiftf] = useState("");
  const d = new Date().getHours();
  const data = control ? tasks.filter((f) => f.crew === control) : [];
  console.log(getCurrentWeek(), d < 14, tasks, data, shiftf);
  // if(!isLoged.config){
  //   alert("config")
  // }
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
      setShiftf(data[0].shift);
      setTasks(data[0].plans);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);
  const setResult = async (cr, t, res) => {
  if(shiftf==="morning" && d>=14 && d<6){
    return;
  }
  if(shiftf==="evening" && d>=22 && d<14){
    return;
  }
  if(shiftf==="night" && d>=6 && d!==22 && d!==23 ){
    return;
  }
    const body = {
      crew: cr,
      taskId: t,
      result: res,
      shift: shiftf,
    };
    console.log(body);
    try {
      const response = await fetch(`${api}/result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
      callback();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={c.container}>
      {tasks.length === 0 && (
        <div className={c.notf}>
          <img src={erimg} alt="not found" />
          <h3>no task found for you!</h3>
        </div>
      )}
      {tasks.length > 0 && (
        <ul
          className={c.underList}
          style={data.length > 0 ? { margin: "1.5rem 0" } : {}}
        >
          {tasks.map((m) => (
            <li
              key={m.crew}
              style={
                control === m.crew
                  ? { opacity: 1, borderBottom: "2px solid white" }
                  : {}
              }
              onClick={(e) => setControl(m.crew)}
            >
              {m.crew}
            </li>
          ))}
        </ul>
      )}
      {data.length > 0 &&
        data[0].tasks.map((m) => (
          <Task
            crew={data[0].crew}
            data={m}
            key={m._id}
            setResult={setResult}
          />
        ))}
    </div>
  );
};

export default Home;

import Select from "react-select";
import c from "./PlaningForm.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { getCurrentWeekNumber } from "../hooks/hfunc";
import api from "../../service/api";
import { useSelector } from "react-redux";
import NetworkNotify from "../UI/NetworkNotify";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",

    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                    "Segoe UI Symbol"`,

    textAlign: "center",
    outline: "none",
    border: "1px solid #414141",
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: "auto",
    "&:hover": {
      border: "1px solid #f33716",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "97%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#f33716",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                    "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "200px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "5px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f33716",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};

const handySelect = (d) => {
  const rd = [];
  try {
    d.map((m) => rd.push({ label: m.crew, value: m.crew }));
    return rd;
  } catch (e) {
    return [];
  }
};

const PlaningForm = (p) => {
  const [dataForm, setDataForm] = useState({
    matricule: p.data.matricule,
    date: getCurrentWeekNumber(),
    shift: "",
  });
  const [crew, setCrew] = useState(false);
  const [crewTask, setCrewTask] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [next, setNext] = useState(true);
  const [auditorJob, setAuditorJob] = useState({
    monitoring: [],
    process: [],
    produit: [],
  });
  const [dataList, setDataList] = useState({ crews: [], tasks: [] });
  const { isLoged } = useSelector((s) => s.login);
  console.log(tasks, crewTask, { ...dataForm, ...crewTask });
  const [err, setErr] = useState(false);
  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/location`, {
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
      setDataList((p) => ({ ...p, crews: data }));
    } catch (e) {
      console.error(e);
    }
    try {
      const response = await fetch(`${api}/task/`, {
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
      setAuditorJob({
        monitoring: data.MONITORING,
        process: data.PROCESS,
        produit: data.PRODUIT,
      });
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);

  const findTask = (t) => {
    const i = tasks.findIndex((i) => i === t);
    if (i > -1) {
      return true;
    } else {
      return false;
    }
  };

  const onChangeHandler = (e, d) => {
    switch (d) {
      case "week":
        setDataForm((p) => ({ ...p, date: e.target.value }));
        break;
      case "shift":
        setDataForm((p) => ({ ...p, shift: e.value }));
        break;
      case "crew":
        setCrew(e.value);
        const i = crewTask.findIndex((f) => f.crew === e.value);
        if (i > -1) {
          setTasks(crewTask[i].tasks);
        }
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (next) {
      if (dataForm.shift.trim() !== "") {
        setNext(false);
      }
      return;
    }
    if (!crew) {
      return;
    }
    const confirmation = window.confirm("do you want to add crews?");
    if (confirmation) {
      if (crewTask.length > 0) {
        const i = crewTask.findIndex((f) => f.crew === crew);
        console.log(i);
        if (i > -1) {
          console.log("found");
          setCrewTask((p) => [
            ...p.filter((f) => f.crew !== crew),
            {
              crew: crew,
              tasks: tasks,
            },
          ]);
        } else {
          console.log("not found");
          setCrewTask((p) => [
            ...p,
            {
              crew: crew,
              tasks: tasks,
            },
          ]);
        }
      } else {
        setCrewTask((p) => [
          ...p,
          {
            crew: crew,
            tasks: tasks,
          },
        ]);
      }

      setCrew(false);
      setTasks([]);
      return;
    } else {
      const i = crewTask.findIndex((f) => f.crew === crew);
      if (i > -1) {
        setCrewTask((p) => [
          ...p.filter((f) => f.crew !== crew),
          {
            crew: crew,
            tasks: tasks,
          },
        ]);
      } else {
        setCrewTask((p) => [
          ...p,
          {
            crew: crew,
            tasks: tasks,
          },
        ]);
      }
      const body = {
        username: dataForm.matricule,
        week: dataForm.date,
        shift: dataForm.shift,
        plans: [...crewTask],
      };
      console.log(body);
      try {
        const response = await fetch(`${api}/planning/`, {
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
      } catch (e) {
        setErr(true);
        console.error(e);
      }
    }
  };

  const onchangeHandlercb = (e, i) => {
    if (e.target.checked) {
      setTasks((p) => [...p, i]);
    }
    if (!e.target.checked) {
      setTasks((p) => p.filter((f) => f !== i));
    }
  };

  const checkAll = (e, t) => {
    if (e.target.checked) {
      auditorJob[t].forEach((el) => {
        if (!findTask(el._id)) {
          setTasks((p) => [...p, el._id]);
        }
      });
    }
    if (!e.target.checked) {
      auditorJob[t].forEach((el) => {
        setTasks((p) => p.filter((f) => f !== el._id));
      });
    }
  };

  if (err) {
    setTimeout(() => {
      setErr(false);
    }, 3000);
  }

  return (
    <React.Fragment>
      {err && (
        <NetworkNotify message="we encountred an error please try again!" />
      )}
      <div className={c.container}>
        <h3>{p.data.fullName}</h3>
        <form className={c.form} onSubmit={onSubmitHandler}>
          {next && (
            <div className={c.selectsContainer}>
              <div className={c.inputContainer}>
                <label htmlFor="week">week</label>
                <input
                  id="week"
                  type="week"
                  onChange={(e) => onChangeHandler(e, "week")}
                  value={dataForm.date}
                />
              </div>
              <div className={c.inputContainer}>
                <label htmlFor="shift">shift</label>
                <Select
                  options={[
                    { label: "morning", value: "morning" },
                    { label: "evenning", value: "evenning" },
                    { label: "nigth", value: "nigth" },
                  ]}
                  id="shift"
                  inputId="shift"
                  styles={customStyles}
                  placeholder="SELECT SHIFT"
                  onChange={(e) => onChangeHandler(e, "shift")}
                />
              </div>
            </div>
          )}
          {!next && (
            <React.Fragment>
              <div className={c.inputContainer} style={{ margin: "auto" }}>
                <label htmlFor="project">crew</label>
                <Select
                  options={handySelect(dataList.crews)}
                  id="project"
                  inputId="project"
                  styles={customStyles}
                  placeholder="SELECT CREW"
                  value={!crew ? {} : { label: crew, value: crew }}
                  onChange={(e) => onChangeHandler(e, "crew")}
                  isDisabled={crew}
                />
              </div>
              {crew && (
                <div className={c.tasksHolder}>
                  <div className={c.taskType}>
                    <h4>process</h4>
                    <div className={c.tasks}>
                      <div className={c.task}>
                        <input
                          id={"all"}
                          type="checkbox"
                          onChange={(e) => checkAll(e, "process")}
                        />
                        <label htmlFor={"all"}>{"check all"}</label>
                      </div>
                      {auditorJob.process.map((m) => (
                        <div className={c.task} key={m._id}>
                          <input
                            id={m._id}
                            type="checkbox"
                            onChange={(e) => onchangeHandlercb(e, m._id)}
                            checked={findTask(m._id)}
                          />
                          <label
                            htmlFor={m._id}
                            style={
                              findTask(m._id)
                                ? { color: "#f33716", fontWeight: 700 }
                                : { color: "aliceblue", fontWeight: "normal" }
                            }
                          >
                            {m.task}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={c.taskType}>
                    <h4>monitoring</h4>
                    <div className={c.tasks}>
                      <div className={c.task}>
                        <input
                          id={"allm"}
                          type="checkbox"
                          onChange={(e) => checkAll(e, "monitoring")}
                        />
                        <label htmlFor={"allm"}>{"check all"}</label>
                      </div>
                      {auditorJob.monitoring.map((m, i) => (
                        <div className={c.task} key={m._id}>
                          <input
                            id={m._id}
                            type="checkbox"
                            onChange={(e) => onchangeHandlercb(e, m._id)}
                            checked={findTask(m._id)}
                          />
                          <label
                            htmlFor={m._id}
                            style={
                              findTask(m._id)
                                ? { color: "#f33716", fontWeight: 700 }
                                : { color: "aliceblue", fontWeight: "normal" }
                            }
                          >
                            {m.task}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={c.taskType}>
                    <h4>produit</h4>
                    <div className={c.tasks}>
                      <div className={c.task}>
                        <input
                          id={"allp"}
                          type="checkbox"
                          onChange={(e) => checkAll(e, "produit")}
                        />
                        <label htmlFor={"allp"}>{"check all"}</label>
                      </div>
                      {auditorJob.produit.map((m, i) => (
                        <div className={c.task} key={m._id}>
                          <input
                            id={m._id}
                            type="checkbox"
                            onChange={(e) => onchangeHandlercb(e, m._id)}
                            checked={findTask(m._id)}
                          />
                          <label
                            htmlFor={m._id}
                            style={
                              findTask(m._id)
                                ? { color: "#f33716", fontWeight: 700 }
                                : { color: "aliceblue", fontWeight: "normal" }
                            }
                          >
                            {m.task}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
          <button type="submit">{next ? "next" : "submit"}</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PlaningForm;

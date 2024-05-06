import Select from "react-select";
import c from "./PlaningForm.module.css";
import React, { useState } from "react";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",

    textTransform: "none",
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
    textTransform: "none",
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

const auditorJob = {
  process: [
    "Checklist Table Pre-control",
    "Checklist d’étenchiète",
    "Checklist Heat Shrinking : Funda",
    "Checklist US USW: Epissure + Ring",
    "Checklist Tape dispenser",
    "Checklist Contrôle électrique",
    "Checklist Pistolet",
    "Checklist Molette",
    "Checklist Goulotte",
    "Checklist PUR",
    "Checklist Torque",
    "Checklist Vision machine",
    "Checklist Vision machine",
  ],
  monitoring: [
    "Communication et suivi des réclamation Interne / Externe et fonctionnement de Quality-Gate",
    "Suivi des problèmes Dummy Harness",
    "CUT-OFF Error Proof US",
    "Suivi et contrôle de travail du nouveau opérateur",
    "Checklist Layred Process Audit: Containment Fire-Wall-CSL & FA",
    "Carte de contrôle des défauts et Aproch FTQ /Suivi et validation de Réparation",
    "Checklist Carte monitoring",
    "Plan control de qualité: process/produit/monitoring",
    "Checklist des paramètres",
    "Carte  de contrôle: Monitoring /Process & Produit",
    "Traitement de produit & compensant non conforme ( Chaque 2 heurs)",
    "Validation des interventions de la maintenance(Chaque intervention de maintenance)",
  ],
  produit: [
    "Prendre un câblage du produit fini prêt à envoyer",
    "100% Emballage",
    "100% dimensionnelles et aspect visuelles",
    "Positionner les fils et les connecteurs s’il y a-un changement d'ingénierie",
  ],
};

const PlaningForm = (p) => {
  const [dataForm, setDataForm] = useState({
    project: "",
    family: "",
    line: "",
    crew: "",
    audit: "",
    shift: "",
  });
  const [next, setNext] = useState(true);
  // const handleCheckAll = () => {
  //   const updatedCheckboxState = {};
  //   const ids = [];
  //   orders.forEach((order) => {
  //     updatedCheckboxState[order.qualificationId] = true;
  //     ids.push(order.qualificationId);
  //   });
  //   setCheckboxState(updatedCheckboxState);
  //   setOrderIds(ids);
  // };
  const onChangeHandler = (e, d) => {
    switch (d) {
      case "project":
        setDataForm((p) => ({ ...p, project: e.value }));
        break;
      case "family":
        setDataForm((p) => ({ ...p, family: e.value }));
        break;
      case "line":
        setDataForm((p) => ({ ...p, line: e.value }));
        break;
      case "crew":
        setDataForm((p) => ({ ...p, crew: e.value }));
        break;
      case "audit":
        setDataForm((p) => ({ ...p, audit: e.value }));
        break;
      case "shift":
        setDataForm((p) => ({ ...p, shift: e.value }));
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (next) {
      setNext(false);
      return;
    }
    //http request post
  };

  return (
    <div className={c.container}>
      <h3>{p.data.fullName}</h3>
      <form className={c.form} onSubmit={onSubmitHandler}>
        {next && (
          <div className={c.selectsContainer}>
            <div className={c.inputContainer}>
              <label htmlFor="project">project</label>
              <Select
                options={[]}
                id="project"
                inputId="project"
                styles={customStyles}
                placeholder="SELECT PROJECT"
                onChange={(e) => onChangeHandler(e, "project")}
              />
            </div>
            <div className={c.inputContainer}>
              <label htmlFor="family">family</label>
              <Select
                options={[]}
                id="family"
                inputId="family"
                styles={customStyles}
                placeholder="SELECT FAMILY"
                onChange={(e) => onChangeHandler(e, "family")}
              />
            </div>
            <div className={c.inputContainer}>
              <label htmlFor="line">line</label>
              <Select
                options={[]}
                id="line"
                inputId="line"
                styles={customStyles}
                placeholder="SELECT LINE"
                onChange={(e) => onChangeHandler(e, "line")}
              />
            </div>
            <div className={c.inputContainer}>
              <label htmlFor="crew">crew</label>
              <Select
                options={[]}
                id="crew"
                inputId="crew"
                styles={customStyles}
                placeholder="SELECT CREW"
                onChange={(e) => onChangeHandler(e, "crew")}
              />
            </div>
            <div className={c.inputContainer}>
              <label htmlFor="shift">shift</label>
              <Select
                options={[]}
                id="shift"
                inputId="shift"
                styles={customStyles}
                placeholder="SELECT SHIFT"
                onChange={(e) => onChangeHandler(e, "shift")}
              />
            </div>
            <div className={c.inputContainer}>
              <label htmlFor="audit">audit</label>
              <Select
                options={[]}
                id="audit"
                inputId="audit"
                styles={customStyles}
                placeholder="SELECT AUDIT"
                onChange={(e) => onChangeHandler(e, "audit")}
              />
            </div>
          </div>
        )}
        {!next && (
          <div className={c.tasksHolder}>
            <div className={c.taskType}>
              <h4>process</h4>
              <div className={c.tasks}>
                <div className={c.task}>
                  <input type="checkbox" />
                  <label>task1</label>
                </div>
                <div className={c.task}>
                  <input type="checkbox" />
                  <label>task1</label>
                </div>
                <div className={c.task}>
                  <input type="checkbox" />
                  <label>task1</label>
                </div>
                <div className={c.task}>
                  <input type="checkbox" />
                  <label>task1</label>
                </div>
                <div className={c.task}>
                  <input type="checkbox" />
                  <label>task1</label>
                </div>
              </div>
            </div>
            <div className={c.taskType}>
              <h4>product</h4>
              <div className={c.tasks}>
                <div className={c.task}>
                  <input type="checkbox" />
                  <label>task1</label>
                </div>
              </div>
            </div>
            <div className={c.taskType}>
              <h4>monitoring</h4>
              <div className={c.tasks}>
                <div className={c.task}>
                  <input type="checkbox" />
                  <label>task1</label>
                </div>
              </div>
            </div>
          </div>
        )}
        <button type="submit">{next ? "next" : "submit"}</button>
      </form>
    </div>
  );
};

export default PlaningForm;

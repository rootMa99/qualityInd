import Select from "react-select";
import c from "./PlaningForm.module.css";
import React from "react";

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

const PlaningForm = (p) => {
  return (
    <div className={c.container}>
      <h3>{p.data.fullName}</h3>
      <form className={c.form}>
        <div className={c.selectsContainer}>
          <div className={c.inputContainer}>
            <label htmlFor="trainingType">project</label>
            <Select
              options={[]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="SELECT"
            />
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="trainingType">family</label>
            <Select
              options={[]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="SELECT"
            />
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="trainingType">line</label>
            <Select
              options={[]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="SELECT"
            />
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="trainingType">crew</label>
            <Select
              options={[]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="SELECT"
            />
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="trainingType">shift</label>
            <Select
              options={[]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="SELECT"
            />
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="trainingType">audit</label>
            <Select
              options={[]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="SELECT"
            />
          </div>
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default PlaningForm;

import React, { useState } from "react";
import c from "./Login.module.css";
import Notification from "../UI/Notification";
import { useDispatch } from "react-redux";
import { USERS } from "../../DemoData";
import { loginActions } from "../../store/loginSlice";

const Login = () => {
  const [loginCred, setLogingCred] = useState({
    name: "",
    pwd: "",
  });
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const ClickHandler = async (e) => {
    e.preventDefault();
    const data= USERS.filter(f=>f.userName===loginCred.name);

    if(data.length>0){
      dispatch(loginActions.logIn(data[0]));
    }
  };

  const nameChangeHadler = (e) => {
    setLogingCred((p) => ({ ...p, name: e.target.value }));
  };

  const pwdChangeHadler = (e) => {
    setLogingCred((p) => ({ ...p, pwd: e.target.value }));
  };

  if (err) {
    setTimeout(() => {
      setErr(false);
    }, 10000);
  }

  return (
    <React.Fragment>
      <div className={c.cont}>
        <span className={c.cer}> </span>
        <h1 className={c.titlte}>quality ind app</h1>
        <span className={c.cer}> </span>
      </div>
      <form className={c["Form-container"]} onSubmit={ClickHandler}>
        <h2 className={c["login-title"]}> Login </h2>
        <div>
          <div id="error" className={c["error-message"]}></div>
        </div>
        <div className={c["user-container"]}>
          <input
            type="text"
            name="matricule"
            placeholder="User Name"
            className={c["username"]}
            value={loginCred.name}
            onChange={nameChangeHadler}
          />
        </div>

        <div className={c["password-container"]}>
          <input
            type="password"
            name="password"
            placeholder="User Password"
            className={c["userpassword"]}
            value={loginCred.pwd}
            onChange={pwdChangeHadler}
          />
        </div>

        <button className={c["Login"]}>Submit</button>
      </form>
      {err && (
        <Notification
          message="The username or password you entered is incorrect.
         Please double-check your credentials and try again."
        />
      )}
    </React.Fragment>
  );
};

export default Login;

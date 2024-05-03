import React, { useState } from "react";
import c from "./Login.module.css";
import Notification from "../UI/Notification";
import { useDispatch } from "react-redux";
import api from "../../service/api";
import { loginActions } from "../../store/loginSlice";
import aptivBgVid from "../../assets/videointro.mp4";
const Login = () => {
  const [loginCred, setLogingCred] = useState({
    name: "",
    pwd: "",
  });
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const ClickHandler = async (e) => {
    e.preventDefault();
    if (loginCred.name.trim() !== "" && loginCred.pwd.trim() !== "") {
      const body = { userName: loginCred.name, password: loginCred.pwd };

      try {
        const response = await fetch(`${api}/auth/signIn`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log(data);
        dispatch(
          loginActions.logIn({
            role: data.role,
            userName: data.userName,
            token: data.token,
          })
        );
      } catch (error) {
        console.error("Error:", error);
        setErr(true);
      }
      // dispatch(
      //   loginActions.logIn({
      //     role: "ROOT",
      //     userName: "data.userName",
      //     token: "data.token",
      //   })
      // );
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
      <video className={c.videoBg} autoPlay loop playsInline muted>
        <source src={aptivBgVid} type="video/mp4" />
      </video>
      <div className={c.cont}>
        <span className={c.cer}> </span>
        <h1 className={c.titlte}>training center app</h1>
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

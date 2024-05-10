import React, { useState } from "react";
import c from "./Login.module.css";
import { useDispatch } from "react-redux";
import api from "../../service/api";
import { loginActions } from "../../store/loginSlice";
import NetworkNotify from "../UI/NetworkNotify";

const ChangePwd = () => {
  const [loginCred, setLogingCred] = useState({
    password: "",
    newPassword: "",
    reNewPassword: "",
  });
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const ClickHandler = async (e) => {
    e.preventDefault();

    if (loginCred.username.trim() === "" || loginCred.password.trim() === "") {
      alert("please make sure all field not empty");
      return;
    }
    try {
      const response = await fetch(`${api}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCred),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
      dispatch(
        loginActions.logIn({
          role: data.user.role,
          userName: data.user.fullname,
          token: data.token,
          config: data.user.isConfigured,
        })
      );
    } catch (e) {
      setErr(true);
      console.error(e);
    }
  };

  const nameChangeHadler = (e) => {
    setLogingCred((p) => ({ ...p, password: e.target.value }));
  };

  const pwdChangeHadler = (e) => {
    setLogingCred((p) => ({ ...p, newPassword: e.target.value }));
  };

  const pwdChangeHadlerr = (e) => {
    setLogingCred((p) => ({ ...p, reNewPassword: e.target.value }));
  };

  if (err) {
    setTimeout(() => {
      setErr(false);
    }, 3000);
  }

  return (
    <React.Fragment>
      <form className={c["Form-container"]} onSubmit={ClickHandler}>
        <h2 className={c["login-title"]}> Change Password </h2>
        <div>
          <div id="error" className={c["error-message"]}></div>
        </div>
        <div className={c["user-container"]}>
          <input
            type="password"
            name="current password"
            placeholder="Enter Current Password"
            className={c["username"]}
            value={loginCred.name}
            onChange={nameChangeHadler}
          />
        </div>

        <div className={c["password-container"]}>
          <input
            type="password"
            name="new password"
            placeholder="Enter New Password"
            className={c["userpassword"]}
            value={loginCred.pwd}
            onChange={pwdChangeHadler}
          />
        </div>
        <div className={c["password-container"]}>
          <input
            type="password"
            name="re password"
            placeholder="Re-Enter New Password"
            className={c["userpassword"]}
            value={loginCred.pwd}
            onChange={pwdChangeHadlerr}
          />
        </div>

        <button className={c["Login"]}>Submit</button>
      </form>
      {err && <NetworkNotify message="we encountred some Error please try again!" />}
    </React.Fragment>
  );
};

export default ChangePwd;

import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../service/api";
import c from "./AddAuditor.module.css";
const AddAuditor = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [auditors, setAuditors] = useState([]);
  const [filter, setFilter] = useState([]);
  const callback = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/user/?role=Auditor&isBelongTo=false`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
      setAuditors(data.users);
      setFilter(data.users);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);
  console.log(auditors);

  const onClickHandler = async (e, m) => {
    try {
      const response = await fetch(`${api}/user/belong-to/add/${m._id}`, {
        method: "POST",
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
      callback();
      p.click(m);
    } catch (e) {
      console.error(e);
    }
  };

  const searchbm = (e) => {
    setFilter(auditors.filter((f) => f.username.includes(e.target.value)));
  };

  return (
    <React.Fragment>
      <div className={c.ccon}>
        <input
          type="text"
          placeholder="search by matricule"
          onChange={searchbm}
          className={c.searchmlle}
        />
        <span className={c.close} onClick={(e) => p.close()}>
          close
        </span>
      </div>
      <div className={c.container}>
        {filter.length > 0 ? (
          filter.map((m) => (
            <div className={c.audit} key={m._id}>
              <div className={c.block}>
                <span className={c.desc}>matricule:</span>
                <span className={c.val}>{m.username}</span>
              </div>
              <div className={c.block}>
                <span className={c.desc}>fullname:</span>
                <span className={c.val}>{m.fullname}</span>
              </div>
              <h3 className={c.add} onClick={(e) => onClickHandler(e, m)}>
                add
              </h3>
            </div>
          ))
        ) : (
          <span className={c.notFound}>THERE IS NO AUDITOR FOUND</span>
        )}
      </div>
    </React.Fragment>
  );
};
export default AddAuditor;

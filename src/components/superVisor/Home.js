import { useCallback, useEffect, useState } from "react";
import { AUDITOR } from "../../DemoData";
import c from "./Home.module.css";
import BackDrop from "../UI/BackDrop";
import PlaningForm from "./PlaningForm";
import { useSelector } from "react-redux";
import api from "../../service/api";
const Home = (p) => {
  const [auditData, setAudit] = useState(AUDITOR);
  const [planify, setPlanify] = useState(false);
  const { isLoged } = useSelector((s) => s.login);
  //http request
  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/user`, {
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
      setAudit(data.users)
    } catch (e) {
      console.error(e);
    }

  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);



  const deletAudit = (e, m) => {
    //http req delete
    setAudit(auditData.filter((f) => f.username !== m));
  };

  const planifyAudit = (e, m) => {
    console.log(m);
    setPlanify(m);
  };
  const close = () => {
    setPlanify(false);
  };

  return (
    <div className={c.container}>
      {planify && <BackDrop click={close} />}
      {planify && <PlaningForm data={planify} click={close}/>}
      <h1 className={c.title}>Auditors list</h1>
      <table className={c.table}>
        <thead>
          <tr>
            <th>matricule</th>
            <th>fullName</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {auditData.map((m) => (
            <tr key={m.username}>
              <td>{m.username}</td>
              <td>{m.fullname}</td>
              <td className={c.plaify} onClick={(e) => planifyAudit(e, m)}>
                planify
              </td>
              <td
                className={c.delete}
                onClick={(e) => deletAudit(e, m.username)}
              >
                delete
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default Home;

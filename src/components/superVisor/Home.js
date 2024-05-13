import { useCallback, useEffect, useState } from "react";
// import { AUDITOR } from "../../DemoData";
import c from "./Home.module.css";
import BackDrop from "../UI/BackDrop";
import PlaningForm from "./PlaningForm";
import { useSelector } from "react-redux";
import api from "../../service/api";
import AddAuditor from "./AddAuditor";

const Home = (p) => {
  const [auditData, setAudit] = useState([]);
  const [planify, setPlanify] = useState(false);
  const { isLoged } = useSelector((s) => s.login);
  const [addAud, setAud] = useState(false);
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
      setAudit(data.users);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);

  const deletAudit = async (e, m) => {
    console.log(m);
    try {
      const response = await fetch(`${api}/user/belong-to/delete/${m._id}`, {
        method: "DELETE",
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
      setAudit(auditData.filter((f) => f.username !== m.username));
    } catch (e) {
      console.error(e);
    }
  };

  const planifyAudit = (e, m) => {
    console.log(m);
    setPlanify(m);
  };
  const close = () => {
    setPlanify(false);
  };

  const AddAuditorToSv = async (m) => {
    console.log(m);
    setAudit(p=>[...p, m]);
  };

  return (
    <div className={c.container}>
      {planify && <BackDrop click={close} />}
      {planify && <PlaningForm data={planify} click={close} />}
      <h1 className={c.title}>Auditors list</h1>
      {!addAud && (
        <h3 className={c.addUser} onClick={(e) => setAud(true)}>
          add auditor
        </h3>
      )}
      {addAud && <AddAuditor click={AddAuditorToSv} />}
      <table className={c.table}>
        <thead>
          <tr>
            <th>matricule</th>
            <th>fullName</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {auditData.map((m, i) => (
            <tr key={i}>
              <td>{m.username}</td>
              <td>{m.fullname}</td>
              <td className={c.plaify} onClick={(e) => planifyAudit(e, m)}>
                planify
              </td>
              <td className={c.delete} onClick={(e) => deletAudit(e, m)}>
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

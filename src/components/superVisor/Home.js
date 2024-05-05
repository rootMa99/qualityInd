import { useState } from "react";
import { AUDITOR } from "../../DemoData";
import c from "./Home.module.css";
import BackDrop from "../UI/BackDrop";
import PlaningForm from "./PlaningForm";

const Home = (p) => {
  const [auditData, setAudit] = useState(AUDITOR);
  const [planify, setPlanify] = useState(false);
  //http request

  const deletAudit = (e, m) => {
    //http req delete
    setAudit(auditData.filter((f) => f.matricule !== m));
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
      {planify && <PlaningForm data={planify} />}
      <h1 className={c.title}>Auditors list</h1>
      <table className={c.table}>
        <thead>
          <th>matricule</th>
          <th>fullName</th>
          <th colSpan={2}></th>
        </thead>
        <tbody>
          {auditData.map((m) => (
            <tr key={m.matricule}>
              <td>{m.matricule}</td>
              <td>{m.fullName}</td>
              <td className={c.plaify} onClick={(e) => planifyAudit(e, m)}>
                planify
              </td>
              <td
                className={c.delete}
                onClick={(e) => deletAudit(e, m.matricule)}
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

import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../service/api";
import c from "./AddAuditor.module.css";
const AddAuditor = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [auditors, setAuditors] = useState([]);
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
      setAuditors(data);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <div className={c.container}>
      <span>X</span>
      <div className={c.audit}>
        <div className={c.block}>
          <span className={c.desc}>matricule:</span>
          <span className={c.val}>865</span>
        </div>
        <div className={c.block}>
          <span className={c.desc}>fullname:</span>
          <span className={c.val}>OUBA SAID</span>
        </div>
        <h3 className={c.add}>add</h3>
      </div>
    </div>
  );
};
export default AddAuditor;

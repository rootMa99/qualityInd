import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../service/api";
const AddAuditor = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/user/?role=Auditor&isBelongTo=false`, {
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
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);

  return <div></div>;
};
export default AddAuditor;

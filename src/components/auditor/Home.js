import { useCallback, useEffect } from "react";
import c from "./Home.module.css";
import api from "../../service/api";
import { useSelector } from "react-redux";
const Home = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  
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
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);

  return <div className={c.container}></div>;
};
export default Home;

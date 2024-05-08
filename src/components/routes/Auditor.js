import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../auditor/Home";

const Auditor=p=>{
    return (
        <Suspense>
          <Routes>
            <Route index path="/" element={<Navigate replace to="/home" />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </Suspense>
      );
}
export default Auditor;
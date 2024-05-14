import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../superVisor/Home";
import Dashboard from "../superVisor/Dashboard";

const SuperVisor = (p) => {
  return (
    <Suspense>
      <Routes>
        <Route index path="/" element={<Navigate replace to="/home" />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Suspense>
  );
};

export default SuperVisor;

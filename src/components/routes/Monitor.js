import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Monitor = (p) => {
  return (
    <Suspense>
      <Routes>
        <Route index path="/" element={<Navigate replace to="/home" />} />
        <Route exact path="/home" element={<h1>home</h1>} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Suspense>
  );
};

export default Monitor;

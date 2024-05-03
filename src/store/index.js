import { configureStore } from "@reduxjs/toolkit";
import loginS from "./loginSlice";

const store = configureStore({
  reducer: { login: loginS.reducer },
});

export default store;

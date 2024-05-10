import { createSlice } from "@reduxjs/toolkit";


const loginS = createSlice({
  name: "logins",
  initialState: {
    isLoged: {
      login: false,
      role: "",
      userName: "",
      token: "",
      config:false
    }
  },
  reducers: {
    logIn(s, p) {
      s.isLoged.login = true;
      s.isLoged.role = p.payload.role;
      s.isLoged.userName = p.payload.userName;
      s.isLoged.token = p.payload.token;
      s.isLoged.config = p.payload.config;
    },
    logout(s, p) {
      s.isLoged = {
        login: false,
        role: "",
        userName: "",
        token: "",
        config:false
      };
    },
  },
});

export const loginActions = loginS.actions;
export default loginS;

import { useSelector } from 'react-redux';
import './App.css';
import NavBar from './components/UI/NavBar';
import Login from "./components/login/Login"
import React from 'react';
import Auditor from './components/routes/Auditor';
import SuperVisor from './components/routes/SuperVisor';
import Monitor from './components/routes/Monitor';

function App() {
  const { isLoged } = useSelector((s) => s.login);

  return (
    <div className="App">
      <NavBar />
      {
        <React.Fragment>
        {!isLoged.login && <Login />}
        {isLoged.login && isLoged.role==="audit" && <Auditor /> }
        {isLoged.login && isLoged.role==="spv" && <SuperVisor /> }
        {isLoged.login && isLoged.role==="monitor" && <Monitor /> }
        </React.Fragment>
         
      }
    </div>
  );
}

export default App;

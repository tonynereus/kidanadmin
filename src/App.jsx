import { Space, Typography } from "antd";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Dashboard from "./Dashboard";
import LoginForm from "./Login";
import AppContext from "./concept/appConcept";
import { BrowserRouter, Route, Routes } from "react-router-dom";





function App() {
  const accInfo = {
    userName: "---",
    role: "",
  }

  const defaultValues = {
    accInfo: accInfo,
    logged: false,
    token:"",
  }

  const [appConcept, updateApp] = useState(defaultValues);

  const setLogin = (data) => {
    updateApp({ ...appConcept, accInfo:{...accInfo,...data},logged:true});
  }
  const setToken = (token)=>{
    updateApp({ ...appConcept,token:token });
  }

  const functions = {
    setLogin,
    setToken
  }
  return (
    <AppContext.Provider value={{ ...appConcept,...functions,}}>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/dashboard/*" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </AppContext.Provider>
  );
}
export default App;

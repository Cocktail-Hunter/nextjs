import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import UnAuthorized from "./Routes/UnAuthorized";
import Private from "./Routes/Private";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TOS from "./Pages/TOS";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Inventory from "./Pages/Inventory/Index";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import Refresh from "./Pages/Refresh";
import Nav from "./Components/Nav";
import Header from "./Components/Header";
import About from "./Pages/About";

import {AuthContext} from "./Contexts/Auth";

import "./App.scss";

const App = () => {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("accessToken");

    if (accessToken && refreshToken) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <AuthContext.Provider value={{authed, setAuthed}}>
          <Header setShow={setShowSidebar}/>
          <Nav show={showSidebar} setShow={setShowSidebar}/>
          <Switch>
            <Route path="/" exact>
              <Home/>
            </Route>
            <UnAuthorized path="/login">
              <Login/>
            </UnAuthorized>
            <UnAuthorized path="/register">
              <Register/>
            </UnAuthorized>
            <Route path="/tos">
              <TOS/>
            </Route>
            <Route path="/policy">
              <PrivacyPolicy/>
            </Route>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/refresh">
              <Refresh/>
            </Route>
            <Private path="/inventory">
              <Inventory/>
            </Private>
            <Private path="/profile">
              <Profile/>
            </Private>
            <UnAuthorized path="/forgot-password">
              <ForgotPassword/>
            </UnAuthorized>
          </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
};

export default App;

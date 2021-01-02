import React, { useState } from "react";

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

import "./App.scss";
import Nav from "./Components/Nav";
import Header from "./Components/Header";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header setShow={setShowSidebar}/>
        <Nav show={showSidebar}/>
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
      </Router>
    </div>
  );
};

export default App;

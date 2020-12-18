import React from "react";

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
import Inventory from "./Pages/Inventory";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import Refresh from "./Pages/Refresh";

const App = () => (
  <Router>
    <Switch>
      <div className="App">
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
      </div>
    </Switch>
  </Router>
);

export default App;

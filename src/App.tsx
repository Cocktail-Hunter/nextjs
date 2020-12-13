import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import UnAuthorized from "./Routes/UnAuthorized";
import Private from "./Routes/Private";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TOS from "./pages/TOS";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Inventory from "./pages/Inventory";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Router>
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
}

export default App;

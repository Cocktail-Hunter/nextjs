import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/tos">
            <TOS/>
          </Route>
          <Route path="/policy">
            <PrivacyPolicy/>
          </Route>
          <Route path="/inventory">
            <Inventory/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

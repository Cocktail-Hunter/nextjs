import React, { FC, useCallback } from "react";
import { NavLink, useHistory } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

import Header from "./Header";

import Home from "../assets/Icons/Home";
import Contact from "../assets/Icons/Contact";
import About from "../assets/Icons/About";
import Profile from "../assets/Icons/Profile";
import Inventory from "../assets/Icons/Inventory";
import Login from "../assets/Icons/Login";
import Register from "../assets/Icons/Register";
import Logout from "../assets/Icons/Logout";
import Contract from "../assets/Icons/Contract";

import "./Nav.scss";

interface Props {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav: FC<Props> = ({show, setShow}) => {
  const history = useHistory();
  const authed = useAuth();

  const logout = useCallback(() => {
    localStorage.clear();
    history.push("/login");
  }, [history]);

  return (
    <nav className={`show-${show}`}>
      <Header setShow={setShow}/>
      <div className="spacing"/>
      <NavLink exact to="/" className="item">
        <div className="icon">
          <Home/>
        </div>
        <p>Home</p>
      </NavLink>
      {authed && (
        <>
          <NavLink to="/profile" className="item">
            <div className="icon">
              <Profile/>
            </div>
            <p>Profile</p>
          </NavLink>
          <NavLink to="/inventory" className="item">
            <div className="icon">
              <Inventory/>
            </div>
            <p>Inventory</p>
          </NavLink>
        </>
      )}
      {!authed && (
        <>
          <NavLink to="/login" className="item">
            <div className="icon">
              <Login/>
            </div>
            <p>Login</p>
          </NavLink>
          <NavLink to="/register" className="item">
            <div className="icon">
              <Register/>
            </div>
            <p>Register</p>
          </NavLink>
        </>
      )}
      <NavLink to="/contact" className="item">
        <div className="icon">
          <Contact/>
        </div>
        <p>Contact</p>
      </NavLink>
      <NavLink to="/about" className="item">
        <div className="icon">
          <About/>
        </div>
        <p>About</p>
      </NavLink>
      {!authed && (
        <>
          <NavLink to="/about" className="item">
            <div className="icon">
              <Contract/>
            </div>
            <p>Terms of Service</p>
          </NavLink>
          <NavLink to="/privacy-policy" className="item">
            <div className="icon">
              <Contract/>
            </div>
            <p>Privacy Policy</p>
          </NavLink>
        </>
      )}
      {authed && (
        <div className="item" onClick={logout}>
          <div className="icon">
            <Logout/>
          </div>
          <p>Logout</p>
        </div>
      )}
    </nav>
  );
};

export default Nav;

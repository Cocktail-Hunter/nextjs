import React, { FC, useCallback, useContext, useEffect } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import Home from "../assets/Icons/Home";
import Contact from "../assets/Icons/Contact";
import About from "../assets/Icons/About";
import Profile from "../assets/Icons/Profile";
import Inventory from "../assets/Icons/Inventory";
import Login from "../assets/Icons/Login";
import Register from "../assets/Icons/Register";
import Logout from "../assets/Icons/Logout";
import Contract from "../assets/Icons/Contract";
import { AuthContext, ContextProps } from "../Contexts/Auth";

import "./Nav.scss";

interface Props {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav: FC<Props> = ({show, setShow}) => {
  const location = useLocation();
  const history = useHistory();
  const {authed, setAuthed} = useContext(AuthContext) as ContextProps;

  const logout = useCallback(() => {
    localStorage.clear();
    setAuthed(false);
    history.push("/login");
  }, [history, setAuthed]);

  useEffect(() => {
    setShow(false);
  }, [location, setShow]);

  const updatePos = useCallback(e => {
    const item = e.target.getBoundingClientRect();

    const x = e.clientX - item.left;
    const y = e.clientY - item.top;

    e.target.style.setProperty('--x', `${ x }px`);
    e.target.style.setProperty('--y', `${ y }px`);
  }, []);

  return (
    <nav className={`show-${show}`} onMouseMove={updatePos}>
      <div className="spacing"/>
      <NavLink exact to="/" className="item">
        <div className="innerWrapper">
          <div className="icon">
            <Home/>
          </div>
          <p>Home</p>
        </div>
      </NavLink>
      {authed && (
        <>
          <NavLink to="/profile" className="item">
            <div className="innerWrapper">
              <div className="icon">
                <Profile/>
              </div>
              <p>Profile</p>
            </div>
          </NavLink>
          <NavLink to="/inventory" className="item">
            <div className="innerWrapper">
              <div className="icon">
                <Inventory/>
              </div>
              <p>Inventory</p>
            </div>
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
        <div className="innerWrapper">
          <div className="icon">
            <Contact/>
          </div>
          <p>Contact</p>
        </div>
      </NavLink>
      <NavLink to="/about" className="item">
        <div className="innerWrapper">
          <div className="icon">
            <About/>
          </div>
          <p>About</p>
        </div>
      </NavLink>
      {!authed && (
        <>
          <NavLink to="/terms-of-service" className="item">
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
          <div className="innerWrapper">
            <div className="icon">
              <Logout/>
            </div>
            <p>Logout</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;

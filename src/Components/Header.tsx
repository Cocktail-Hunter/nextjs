import React, { FC } from "react";

import Burger from "../assets/Icons/Burger";
import Logo from "../assets/Logo";

import "./Header.scss";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<Props> = ({setShow}) => (
  <header>
    <div className="toggleSidebar" onClick={() => setShow(state => !state)}>
      <Burger/>
    </div>
    <Logo/>
    <h1>Cocktail Hunter</h1>
  </header>
);

export default Header;

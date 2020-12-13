import React from "react";
import { Link } from "react-router-dom";

function TOS() {
  return (
    <div className="page tos">
      <h1>Cocktail Hunter</h1>
      <p>Find cocktails you can make based on your inventory.</p>
      <h2>Terms of Services</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/policy">Privacy Policy</Link>
          </li>
        </ul>
      </nav>
      <p>Being drafted.</p>
    </div>
  );
}

export default TOS;

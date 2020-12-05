import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="page privacyPolicy">
      <h1>Cocktail Hunter</h1>
      <p>Find cocktails you can make based on your inventory.</p>
      <h2>Privacy Policy</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tos">Terms of Services</Link>
          </li>
        </ul>
      </nav>
      <p>Being drafted.</p>
    </div>
  );
}

export default PrivacyPolicy;

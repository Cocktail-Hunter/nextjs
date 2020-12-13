import React from "react";
import { Link } from "react-router-dom";

function Inventory() {
  return (
    <div className="page inventory">
      <h1>Cocktail Hunter</h1>
      <p>Find cocktails you can make based on your inventory.</p>
      <h2>Inventory</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <section>
        <h3>Ingredients</h3>
      </section>
      <section>
        <h3>Cocktails you can make</h3>
      </section>
    </div>
  );
}

export default Inventory;

import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="page forgotPassword">
      <h1>Cocktail Hunter</h1>
      <p>Find cocktails you can make based on your inventory.</p>
      <h2>Forgot Password</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <section>
        <div className="fields">
          <label>
            <p>Email</p>
            <input/>
          </label>
        </div>
        <Link to="/inventory">
          <button>
            Send password reset email
          </button>
        </Link>
      </section>
    </div>
  );
}

export default ForgotPassword;

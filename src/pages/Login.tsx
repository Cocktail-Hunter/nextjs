import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="page login">
      <h1>Cocktail Hunter</h1>
      <p>Find cocktails you can make based on your inventory.</p>
      <h2>Login</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <section>
        <div className="fields">
          <label>
            <p>Email</p>
            <input/>
          </label>
          <label>
            <p>Password</p>
            <input type="password"/>
          </label>
        </div>
        <Link to="/inventory">
          <button>
            Authenticate
          </button>
        </Link>
        <Link to="/forgot-password">
          <button>
            Forgot Password
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Login;

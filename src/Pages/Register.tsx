import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="page register">
      <h1>Cocktail Hunter</h1>
      <p>Find cocktails you can make based on your inventory.</p>
      <h2>Register</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Login</Link>
          </li>
        </ul>
      </nav>
      <section>
        <div className="fields">
          <label>
            <p>Username</p>
            <input/>
          </label>
          <label>
            <p>Email</p>
            <input/>
          </label>
          <label>
            <p>Password</p>
            <input type="password"/>
          </label>
          <label>
            <p>Repeat password</p>
            <input type="password"/>
          </label>
          <hr/>
          <label>
            <input type="checkbox"/>
            I agree to the <Link to="/tos">Terms of Service</Link> and <Link to="/policy">Privacy Policy</Link>
          </label>
          <hr/>
        </div>
        <Link to="/inventory">
          <button>
            Register
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Register;

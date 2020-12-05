import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="page profile">
      <h1>Cocktail Hunter</h1>
      <p>Find cocktails you can make based on your inventory.</p>
      <h2>Profile</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
        </ul>
      </nav>
      <section>
        <p>Username:</p>
        <p>Email:</p>
      </section>
      <section>
        <button>Change password</button>
        <button>Delete account</button>
        <button>Verify email</button>
        <button>Download my data</button>
      </section>
      <footer>
        <hr/>
        <ul>
          <li>
            <Link to="/tos">Terms of Service</Link>
          </li>
          <li>
            <Link to="/privacy policy">Privacy Policy</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Profile;

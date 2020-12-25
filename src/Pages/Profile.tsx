import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IUser } from "../interfaces";

function Profile() {
  const history = useHistory();

  const [user, setUser] = useState<IUser | null>();
  const [warn, setWarn] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    (async () => {
      const body: RequestInit = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      };

      try {
        const req = await fetch("/v1/user", body);

        if (req.status === 401) {
          const redirect = encodeURIComponent("/profile");
          history.push(`/refresh?redirect=${redirect}`);
          return;
        }

        if (req.status === 200) {
          const payload = await req.json() as IUser;
          setUser(payload);
          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [history]);

  const logout = useCallback(() => {
    localStorage.clear();
    history.push("/");
  }, [history]);

  let createdAt = "";
  let lastLogin = "";

  if (user) {
    createdAt = (new Date(user.createdAt)).toDateString();
    lastLogin = (new Date(user.lastLogin)).toDateString();
  }

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
      {warn && <p>{warn}</p>}
      <section>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <p>Created at: {createdAt}</p>
        <p>Last login: {lastLogin}</p>
      </section>
      <section>
        <button>Change password</button>
        <button>Delete account</button>
        <button>Verify email</button>
        <button>Download my data</button>
        <button onClick={logout}>Logout</button>
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

import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginPayload } from "../interfaces";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [warnEmail, setWarnEmail] = useState("");

  const [password, setPassword] = useState("");
  const [warnPass, setWarnPass] = useState("");

  const [warn, setWarn] = useState("");

  useEffect(() => setWarn(""), [email, password]);
  useEffect(() => setWarnEmail(""), [email]);
  useEffect(() => setWarnPass(""), [password]);

  const login = useCallback(async () => {
    if (email.length === 0) {
      setWarnEmail("Empty");
    }

    if (password.length < 8) {
      setWarnPass("Password has to be over 8 chars long.");
    }

    if (email.length > 0 && password.length > 8) {
      try {
        const body: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }

        const req = await fetch("/v1/auth/login/", body);
        const payload = await req.json() as LoginPayload;

        if (req.status === 401) {
          setWarn("Incorrect credentials");
          return;
        }

        if (req.status === 200) {
          localStorage.setItem("accessToken", payload.access);
          localStorage.setItem("refreshToken", payload.refresh);
          history.push("/");

          return;
        }

        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    }
  }, [history, email, password]);

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
            {warnEmail.length > 0 && <p>ERROR: {warnEmail}</p>}
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            {warnPass.length > 0 && <p>ERROR: {warnPass}</p>}
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </label>
        </div>
        {warn.length > 0 && <p>ERROR: {warn}</p>}
        <button onClick={login}>
          Authenticate
        </button>
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

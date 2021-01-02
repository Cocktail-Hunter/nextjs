import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ILoginPayload } from "../interfaces";

import "./Login.scss";

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

        const req = await fetch(`${process.env.REACT_APP_API}/v1/auth/login/`, body);
        const payload = await req.json() as ILoginPayload;

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
      <h2>Enter your account</h2>
      <h1>Start making cocktails</h1>
      <section>
        <div className="fields">
          <div className="field">
            <p>Email</p>
            {warnEmail.length > 0 && <p>ERROR: {warnEmail}</p>}
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <p>Password</p>
            {warnPass.length > 0 && <p>ERROR: {warnPass}</p>}
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </div>
        </div>
        {warn.length > 0 && <p>ERROR: {warn}</p>}
        <div className="actions">
          <button onClick={login}>
            Login
          </button>
          <Link to="/forgot-password">
            Reset Password
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Login;

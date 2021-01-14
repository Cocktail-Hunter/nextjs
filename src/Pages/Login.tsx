import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext, ContextProps } from "../Contexts/Auth";
import { ILoginPayload } from "../interfaces";

import "./Login.scss";

function Login() {
  const history = useHistory();
  const {setAuthed} = useContext(AuthContext) as ContextProps;

  const [email, setEmail] = useState("");
  const [warnEmail, setWarnEmail] = useState("");

  const [pass, setPass] = useState("");
  const [warnPass, setWarnPass] = useState("");

  const [warn, setWarn] = useState("");

  useEffect(() => setWarn(""), [email, pass]);
  useEffect(() => setWarnEmail(""), [email]);
  useEffect(() => setWarnPass(""), [pass]);

  const login = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^\S+@\S+\.\S+$/g;

    if (email.length === 0) {
      setWarnEmail("This field is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setWarnEmail("Improper format");
      return;
    }

    if (pass.length === 0) {
      setWarnPass("This field is required");
      return;
    }

    if (pass.length < 8) {
      setWarnPass("Has to be 8 chars or above");
      return;
    }

    if (email.length > 0 && pass.length > 8) {
      try {
        const body: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password: pass
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
          setAuthed(true);
          history.push("/");

          return;
        }

        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    }
  }, [email, history, pass, setAuthed]);

  return (
    <div className="page login">
      <h2>Enter your account</h2>
      <h1>Start making cocktails</h1>
      <form onSubmit={login}>
        <div className="fields">
          <div className="field">
            <p>Email{warnEmail.length > 0 && <span className="highlight"> - {warnEmail}</span>}</p>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <p>Password{warnPass.length > 0 && <span className="highlight"> - {warnPass}</span>}</p>
            <input
              value={pass}
              onChange={e => setPass(e.target.value)}
              type="password"
            />
          </div>
        </div>
        {warn.length > 0 && <p className="error highlight">{warn}</p>}
        <div className="actions">
          <input type="submit" value="Login"/>
          <Link to="/forgot-password">
            Reset Password
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

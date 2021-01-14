import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Check from "../assets/Icons/Check";
import { AuthContext, ContextProps } from "../Contexts/Auth";

import "./Register.scss";

function Register() {
  const history = useHistory();
  const {setAuthed} = useContext(AuthContext) as ContextProps;

  const [username, setUsername] = useState("");
  const [warnUsername, setWarnUsername] = useState("");

  const [email, setEmail] = useState("");
  const [warnEmail, setWarnEmail] = useState("");

  const [pass, setPass] = useState("");
  const [warnPass, setWarnPass] = useState("");

  const [agreement, setAgreement] = useState(false);
  const [warnAgreement, setWarnAgreement] = useState("");

  const [warn, setWarn] = useState("");

  useEffect(() => setWarn(""), [username, email, pass, agreement]);
  useEffect(() => setWarnUsername(""), [username]);
  useEffect(() => setWarnEmail(""), [email]);
  useEffect(() => setWarnPass(""), [pass]);
  useEffect(() => setWarnAgreement(""), [agreement]);

  const register = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^\S+@\S+\.\S+$/g;

    if (username.length === 0) {
      setWarnUsername("This field is required");
      return;
    }

    if (username.length < 3) {
      setWarnUsername("Has to be 3 chars or above");
      return;
    }

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

    if (!agreement) {
      setWarnAgreement("You have to agree to our ToS to have an account with us!");
      return;
    }

    if (username.length > 3 && email.length > 0 && pass.length > 8 && agreement) {
      try {
        const body: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            password: pass
          })
        }

        const req = await fetch(`${process.env.REACT_APP_API}/v1/auth/register/`, body);
        const payload = await req.json();

        if (req.status === 401) {
          setWarn("Incorrect credentials");
          return;
        }

        if (req.status === 201) {
          localStorage.setItem("accessToken", payload.tokens.access);
          localStorage.setItem("refreshToken", payload.tokens.refresh);
          setAuthed(true);
          history.push("/");

          return;
        }

        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    }
  }, [agreement, email, history, pass, setAuthed, username]);

  return (
    <div className="page register">
      <h2>Create your account</h2>
      <h1>Start making cocktails</h1>
      <form onSubmit={register}>
        <div className="fields">
          <div className="field">
            <p>Username{warnUsername.length > 0 && <span className="highlight"> - {warnUsername}</span>}</p>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
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
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
        </div>
        <div className="agreement">
          {warnAgreement.length > 0 && <p>ERROR: {warnAgreement}</p>}
          <div
            className={`checkbox checked-${agreement}`}
            onClick={() => setAgreement(state => !state)}
          >
            <Check/>
          </div>
          <p>I agree to the <Link to="/tos">Terms of Service</Link> and <Link to="/policy">Privacy Policy</Link></p>
        </div>
        {warn.length > 0 && <p className="error highlight">{warn}</p>}
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}

export default Register;

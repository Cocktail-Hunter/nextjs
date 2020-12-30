import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [warnUsername, setWarnUsername] = useState("");

  const [email, setEmail] = useState("");
  const [warnEmail, setWarnEmail] = useState("");

  const [password1, setPassword1] = useState("");
  const [warnPass1, setWarnPass1] = useState("");
  const [password2, setPassword2] = useState("");
  const [warnPass2, setWarnPass2] = useState("");

  const [agreement, setAgreement] = useState(false);
  const [warnAgreement, setWarnAgreement] = useState("");

  const [warn, setWarn] = useState("");

  useEffect(() => setWarn(""), [username, email, password1, password2, agreement]);
  useEffect(() => setWarnUsername(""), [username]);
  useEffect(() => setWarnEmail(""), [email]);
  useEffect(() => setWarnPass1(""), [password1]);
  useEffect(() => setWarnPass2(""), [password2]);
  useEffect(() => setWarnAgreement(""), [agreement]);

  const register = useCallback(async () => {
    if (username.length < 3) {
      setWarnUsername("Has to be over 3 chars long.");
    }

    if (email.length === 0) {
      setWarnEmail("Empty");
    }

    if (password1.length < 8) {
      setWarnPass1("Has to be over 8 chars long.");
    }

    if (password1 !== password2) {
      setWarnPass2("Passwords don't match");
    }

    if (!agreement) {
      setWarnAgreement("You have to agree to our ToS to have an account with us!");
    }

    if (username.length > 3 && email.length > 0 && password1.length > 8 && password1 === password2 && agreement) {
      try {
        const body: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            password: password1
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
          history.push("/");

          return;
        }

        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    }
  }, [history, username, email, password1, password2, agreement]);
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
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <section>
        <div className="fields">
          <label>
            <p>Username</p>
            {warnUsername.length > 0 && <p>ERROR: {warnUsername}</p>}
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
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
            {warnPass1.length > 0 && <p>ERROR: {warnPass1}</p>}
            <input
              type="password"
              value={password1}
              onChange={e => setPassword1(e.target.value)}
            />
          </label>
          <label>
            <p>Repeat password</p>
            {warnPass2.length > 0 && <p>ERROR: {warnPass2}</p>}
            <input
              type="password"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
          </label>
          <div>
            {warnAgreement.length > 0 && <p>ERROR: {warnAgreement}</p>}
            <label>
              <input type="checkbox" checked={agreement} onChange={e => setAgreement(e.target.checked)}/>
              I agree to the <Link to="/tos">Terms of Service</Link> and <Link to="/policy">Privacy Policy</Link>
            </label>
          </div>
        </div>
        {warn.length > 0 && <p>ERROR: {warn}</p>}
        <button onClick={register}>
          Register
        </button>
      </section>
    </div>
  );
}

export default Register;

import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext, ContextProps } from "../Contexts/Auth";

import { IRefreshPayload } from "../interfaces";

import "./Refresh.scss";

function Refresh() {
  const history = useHistory();
  const {setAuthed} = useContext(AuthContext) as ContextProps;

  const [ redirect, setRedirect ] = useState("");
  const [ warn, setWarn ] = useState("");

  useEffect(() => {
    const redirectPath = history.location.search.split("?redirect=")[1];

    if (redirectPath) {
      setRedirect(decodeURIComponent(redirectPath));
    }
  }, [history.location.search]);

  const logout = useCallback(() => {
    localStorage.clear();
    setAuthed(false);
    history.push("/login");
  }, [history, setAuthed]);

  useEffect(() => {
    if (!redirect) return;

    const refreshToken = localStorage.getItem("refreshToken");


    if (!refreshToken) {
      logout();
      return;
    }

    (async () => {
      const body: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          refresh: refreshToken
        })
      };


      try {
        const req = await fetch(`${process.env.REACT_APP_API}/v1/auth/refresh/`, body);

        if (req.status === 401) {
          logout();
          return;
        }

        if (req.status === 200) {
          const payload = await req.json() as IRefreshPayload;

          localStorage.setItem("accessToken", payload.access);
          history.push(redirect);
          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn("There has been an unxepected error trying to verify you.");
      }
    })();
  }, [history, logout, redirect]);

  return (
    <div className="page refresh">
      {!warn && (redirect
        ? <h2>Verifying you, this will take a couple seconds!</h2>
        : <h2>Seems like you stumbled here by accident...</h2>
      )}
      {warn && <h2>{warn}</h2>}
    </div>
  );
}

export default Refresh;

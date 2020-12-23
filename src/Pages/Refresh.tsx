import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { IRefreshPayload } from "../interfaces";

function Refresh() {
  const history = useHistory();

  const [ redirect, setRedirect ] = useState("");
  const [ warn, setWarn ] = useState("");

  useEffect(() => {
    const redirectPath = history.location.search.split("?redirect=")[1];

    if (redirectPath) {
      setRedirect(decodeURIComponent(redirectPath));
    }
  }, [history.location.search]);

  useEffect(() => {
    if (!redirect) return;

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.clear();
      history.push("/login");

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
        const req = await fetch("/v1/auth/refresh/", body);

        if (req.status === 401) {
          localStorage.clear();
          history.push("/login");

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
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [history, redirect]);

  return (
    <div className="page refresh">
      <h1>Cocktail Hunter</h1>
      {redirect
        ? <p>Verifying its you, this will take a couple seconds!</p>
        : <p>Seems like you stumbled here by accident...</p>
      }
      {warn && <p>ERR: {warn}</p>}
    </div>
  );
}

export default Refresh;

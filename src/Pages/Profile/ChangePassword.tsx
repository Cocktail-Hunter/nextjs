import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Index.scss";

function ChangePassword() {
  const history = useHistory();

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [warn, setWarn] = useState("");

  const change = useCallback(() => {
    const accessToken = localStorage.getItem("accessToken");

    (async () => {
      const body: RequestInit = {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          oldPassword: currentPass,
          newPassword: newPass
        })
      };

      try {
        const req = await fetch(`${process.env.REACT_APP_API}/v1/user/change-password/`, body);

        if (req.status === 401) {
          const redirect = encodeURIComponent("/profile");
          history.push(`/refresh?redirect=${redirect}`);
          return;
        }

        if (req.status === 200) {
          setCurrentPass("");
          setNewPass("");
          setWarn("Password updated.")
          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [currentPass, history, newPass]);

  return (
    <section>
      <h1>Manage password</h1>
      <div className="fields">
        <div className="field">
          <p>Current password</p>
          <input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)}/>
        </div>
        <div className="field">
          <p>New password</p>
          <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)}/>
        </div>
      </div>
      {warn && <p>{warn}</p>}
      <button onClick={change}>Change password</button>
    </section>
  );
}

export default ChangePassword;

import React, {  useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Check from "../../assets/Icons/Check";
import Contract from "../../assets/Icons/Contract";
import Cross from "../../assets/Icons/Cross";
import { IUser } from "../../interfaces";
import ChangePassword from "./ChangePassword";

import "./Index.scss";

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
        const req = await fetch(`${process.env.REACT_APP_API}/v1/user/`, body);

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

  let createdAt = "";
  let lastLogin = "";

  if (user) {
    createdAt = (new Date(user.createdAt)).toDateString();
    lastLogin = (new Date(user.lastLogin)).toDateString();
  }

  return (
    <div className="page profile">
      <section>
        <h1>Details</h1>
        <p>You joined us on <span className="highlight">{createdAt}</span> and you were last seen on <span className="highlight">{lastLogin}</span>.</p>
        {warn && <p>{warn}</p>}
        <div className="field">
          <p>Username</p>
          <p>{user?.username}</p>
        </div>
        <div className="field">
          <p>Email</p>
          <div className="email">
            <p>{user?.email}</p>
            <div className="verified">
              <div className="icon">
                {user?.isVerified
                  ? <Check/>
                  : <Cross/>
                }
              </div>
              {user?.isVerified
                ? <p>Verified</p>
                : <p>Not verified</p>
              }
            </div>
          </div>
          {!user?.isVerified && (
            <button className="emailVerificationBtn">Send a new email verification link</button>
          )}
        </div>
      </section>
      <ChangePassword/>
      <section className="data">
        <h1>Data</h1>
        <p>
          You have the right to download all the data we store on you, simply click the
          button below and you will download a <span className="highlight">.zip</span> file
          which you can extract on your system.
        </p>
        <button>Download</button>
      </section>
      <section className="account">
        <h1>Account</h1>
        <p>
          After sending the request, we will mark your account for deletion where you will
          have 30 days to change your mind; simply login to cancel. After 30 days, your
          account and data will be fully deleted and the changes will be unreversible.
        </p>
        <div className="delAccountBtn">
          <p className="highlight">
            <i>You will be logged out straight away.</i>
          </p>
          <button>Send request to delete my account</button>
        </div>
      </section>
      <div className="separator"/>
      <footer>
        <div className="icon">
          <Contract/>
        </div>
        <Link to="/tos">Terms of Service</Link>
        <Link to="/tos">Privacy Policy</Link>
        <div className="legal">
          <p>Copyright &copy; 2021 Eray Chumak and William Law</p>
          <p>All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default Profile;

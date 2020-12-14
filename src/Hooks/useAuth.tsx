import { useEffect, useState } from "react";

function useAuth() {
  const [authed, setAuthed] = useState<boolean>();

  useEffect(() => {
    const [accessToken, refreshToken] = document.cookie.split(";");

    if (accessToken && refreshToken) {
      setAuthed(true);
    }
  }, []);

  return authed;
}

export default useAuth;

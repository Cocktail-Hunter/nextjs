import { useEffect, useState } from "react";

function useAuth() {
  const [authed, setAuthed] = useState<boolean>();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("accessToken");

    if (accessToken && refreshToken) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, []);

  return authed;
}

export default useAuth;

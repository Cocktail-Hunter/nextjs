import { FC, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

interface Props {
  path: String
}

const Public: FC<Props> = ({children, path}) => {
  const history = useHistory();
  const authed = useAuth();

  useEffect(() => {
    if (authed) {
      history.push("/");
    }
  }, [authed, history]);

  return (
    <Route {...path}>
      {children}
    </Route>
  )
}

export default Public;

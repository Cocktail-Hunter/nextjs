import { FC, useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthContext, ContextProps } from "../Contexts/Auth";

interface Props {
  path: String
}

const Public: FC<Props> = ({children, path}) => {
  const history = useHistory();
  const {authed} = useContext(AuthContext) as ContextProps;

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

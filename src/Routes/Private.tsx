import { FC, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

interface Props {
  path: String
}

const Private: FC<Props> = ({children, path}) => {
  const history = useHistory();

  useEffect(() => {
    const token = document.cookie.split("=")[1];

    if (!token) {
      history.push("/");
    }
  }, [history]);

  return (
    <Route {...path}>
      {children}
    </Route>
  )
}

export default Private;

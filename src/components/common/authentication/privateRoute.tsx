import { Navigate } from "react-router-dom";
import { getUser } from "./getUser";

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

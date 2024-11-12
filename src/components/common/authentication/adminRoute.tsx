import { Navigate } from "react-router-dom";
import { userType } from "./userType.ts";
export const AdminRoute = ({ element }: { element: JSX.Element }) => {
  const storedUser = userType();
  let user = null;
  try {
    user = storedUser ? storedUser : null;
  } catch (error) {
    console.error(error);
    user = null;
  }
  if (user !== "admin") {
    return <Navigate to="/" replace />;
  }

  return element;
};

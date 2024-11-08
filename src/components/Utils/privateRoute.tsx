import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Si no está logueado, redirigir a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, renderizar el componente solicitado
  return element;
};

export default PrivateRoute;

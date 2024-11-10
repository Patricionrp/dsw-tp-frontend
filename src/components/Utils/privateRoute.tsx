import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const storedUser = localStorage.getItem("user");
  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    user = null;
  }

  // Verificamos si el usuario existe
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario existe, renderizamos el componente privado
  return element;
};

export default PrivateRoute;

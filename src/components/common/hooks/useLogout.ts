import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      Cookies.remove("user", { path: "/" });
      navigate("/login"); 
      window.location.reload();
    }
  };

  return { handleLogout };
}

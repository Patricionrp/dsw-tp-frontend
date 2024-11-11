import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAdminRedirect(navigateTo: string) {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("userType"); 
    if (userType === "admin") {
      navigate(navigateTo, { replace: true });
    }
  }, [navigate]);
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userType } from "../authentication/userType.ts";

export function useAdminRedirect(navigateTo: string) {
  const navigate = useNavigate();

  useEffect(() => {
    if (userType() === "admin") {
      navigate(navigateTo, { replace: true });
    }
  }, [navigate]);
}

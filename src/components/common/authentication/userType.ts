import Cookies from "js-cookie";
export function userType() {
  const storedUser = Cookies.get("user");

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);

      if (user.admin === true) {
        return "admin";
      } else {
        return "member";
      }
    } catch (error) {
      console.error("Error parsing user data from cookie:", error);
      return null;
    }
  } else {
    return null;
  }
}

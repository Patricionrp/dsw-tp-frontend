import { getUser } from "./getUser.ts";
export function userType() {
  const user = getUser();
  if (user) {
    try {
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

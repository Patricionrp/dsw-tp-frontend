export function userType() {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.admin === true) {
        return "admin";
      } else {
        return "member";
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  } else {
    return null;
  }
}

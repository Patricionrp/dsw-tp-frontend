import Cookies from "js-cookie";

export function getUser() {
  const storedUser = Cookies.get("user");

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return user;
    } catch (error) {
      console.error("Error al parsear el usuario desde la cookie:", error);
      return null;
    }
  }

  return null;
}

export function getUser() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user;
      } catch (error) {
        console.error("Error al parsear el usuario:", error);
        return null;
      }
    }
    return null;
  }
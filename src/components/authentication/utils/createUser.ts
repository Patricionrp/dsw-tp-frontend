import { porturl } from "../../common/utils/route";
import Cookies from "js-cookie";

interface userData {
  dni: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export async function createUser(userData: userData) {
  const url = porturl + "/api/users";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const res = await response.json();
      const user = res.data.userCreated;

      // Guardamos la cookie con el objeto user
      Cookies.set("user", JSON.stringify(user), {
        expires: 1 / 24, // Expira en 1 hora (1/24 de un día)
        path: "", // Hace la cookie accesible desde cualquier path
        secure: true, // Solo se enviará sobre HTTPS
        httpOnly: true, // Impide el acceso a la cookie desde JavaScript
      });

      console.log("User successfully registered:", user);
      return user;
    } else {
      const errorData = await response.json();
      console.log("Registration failed:", errorData.message);
      return null; // Return null or error data if registration failed
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return null; // Handle unexpected errors
  }
}

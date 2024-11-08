import { porturl } from "./../route";
interface userData {
  dni: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}
export async function createUser(userData: userData) {
  const url = porturl + "api/users";
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
      localStorage.setItem("user", JSON.stringify(user));
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

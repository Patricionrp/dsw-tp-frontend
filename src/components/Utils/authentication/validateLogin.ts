import { porturl } from "./../route";
export async function validateLogin(email: string, password: string) {
  const url = porturl + "/api/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const res = await response.json();
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user, " successfully logged");
      return user;
    } else {
      const errorData = await response.json();
      console.log("Login failed:", errorData.message);
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}

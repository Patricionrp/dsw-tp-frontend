import { porturl } from "./route";
export async function getPurchasedCourses(user: number) {
  const userId = user.toString();
  const url = porturl + `/api/coursePurchaseRecords/user/${userId}/courses`;
  console.log("URL:", url);
  let loading = true;
  let error = null;
  let courses = null;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      courses = data.data;
      console.log("Cursos comprados:", courses); //courses me pone undefinded
      loading = false;
    } else {
      const errorData = await response.json();
      error = errorData.message;
      loading = false;
    }
  } catch (err) {
    console.error("Error en la solicitud para obtener cursos comprados:", err);
    error = "Error en la solicitud";
    loading = false;
  }

  return { loading, error, courses };
}

import { porturl } from "../Utils/route";

interface RemoveOptions {
  headers?: Record<string, string>;
}

export const remove = async (baseUrl: string, options?: RemoveOptions) => {
  const url = `${porturl}${baseUrl}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: options?.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.status; // Retornar el status o cualquier dato adicional si es necesario
  } catch (error) {
    console.error("Error in remove request:", error);
    throw error;
  }
};

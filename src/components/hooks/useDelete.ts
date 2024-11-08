import { porturl } from "../Utils/route";

export const remove = async (baseUrl: string) => {
  baseUrl = porturl + baseUrl;

  const response = await fetch(`${baseUrl}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

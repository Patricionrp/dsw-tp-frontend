import { useState } from "react";
import { porturl } from "../Utils/route";

export function usePost<T>(baseUrl: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  baseUrl = porturl + baseUrl;
  const create = async (item: T): Promise<T | undefined | number> => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const returnedData = result.data;

      console.log(returnedData);
      return returnedData;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, create };
}

import { useState } from "react";
import { porturl } from "../route";

export function usePost<T>(baseUrl: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  baseUrl = porturl + baseUrl;
  const create = async (item: T): Promise<T | null | number> => {
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
      const createdItem: T = result.data.courseCreated;

      return createdItem;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, create };
}

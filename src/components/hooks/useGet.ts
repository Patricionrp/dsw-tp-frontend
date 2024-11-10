import { useState, useEffect, useCallback } from "react";
import { porturl } from "../Utils/route";

export function useGet<T>(baseUrl: string) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  baseUrl = porturl + baseUrl;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = baseUrl;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchData();
  }, [baseUrl]);

  return { data, loading, error, fetchData };
}

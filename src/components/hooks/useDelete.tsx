import { useState } from 'react'
import { porturl } from './route.tsx';

export function useDelete(baseUrl: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    baseUrl = porturl + baseUrl;

    const remove = async (id: number) => {
        setLoading(true);
        try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return { loading, error, remove };
}

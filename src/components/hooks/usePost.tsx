import { useState } from 'react'
import { porturl } from './route.tsx'

export function usePut<T>(baseUrl: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    baseUrl = porturl + baseUrl;
    
    const update = async (id: number, item: T) => {
        setLoading(true);
        try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
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

    return { loading, error, update };
}


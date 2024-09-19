import { useState } from 'react'
import { porturl} from '../route'

export function usePost<T>(baseUrl: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    baseUrl = porturl + baseUrl;
    const create = async (item: T) => {
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
            console.log("Cuerpo de la solicitud:", JSON.stringify(item));
            console.log(baseUrl)

        }catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return { loading, error, create };
}
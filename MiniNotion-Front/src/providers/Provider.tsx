import { Cookies } from "react-cookie";

const baseURL = "http://localhost:3000"

export const cookies = new Cookies();

export async function sendQuery<T>(method: string, url: string, body?: object, headers = { "Content-Type": "application/json" }): Promise<T> {
    try {
        const access_token = cookies.get("access_token");

        const response = await fetch(`${baseURL}/${url}`, {
            method,
            headers: {
                ...headers,
                "Authorization": access_token ? `Bearer ${access_token}` : ""
            },
            body: body ? JSON.stringify(body) : null
        });
        if (!response.ok) {
            let errors = [];
            const errorData = await response.json();

            errors = Array.isArray(errorData.message) ? errorData.message : [errorData.message];
            
            throw new Error(errors.join("; "));
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error(error.message || "Ocorreu um erro inesperado");
    }
}
import { env } from "@/shared/config/env";

interface ApiOptions<TBody = unknown>
    extends Omit<RequestInit, "body"> {
    body?: TBody;
}

export async function api<
    TResponse,
    TBody = unknown,
>(
    endpoint: string,
    {
        body,
        headers,
        ...options
    }: ApiOptions<TBody> = {}
): Promise<TResponse> {
    const response = await fetch(
        `${env.apiUrl}${endpoint}`,
        {
            credentials: "include",

            headers: {
                "Content-Type":
                    "application/json",
                ...headers,
            },

            ...options,

            body:
                body !== undefined
                    ? JSON.stringify(body)
                    : undefined,
        }
    );

    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({
                message: "Unknown error",
            }));

        throw new Error(error.message);
    }

    if (response.status === 204) {
        return undefined as TResponse;
    }

    return response.json();
}
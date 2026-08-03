import { env } from "@/shared/config/env";

async function fetchBlob(
    endpoint: string
): Promise<Blob> {
    const response = await fetch(
        `${env.apiUrl}${endpoint}`,
        {
            credentials: "include",
        }
    );

    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({
                message: `Ошибка сервера (${response.status})`,
            }));

        throw new Error(error.message);
    }

    return response.blob();
}

export const exportApi = {
    exportPdf() {
        return fetchBlob("/export/pdf");
    },

    exportDocx() {
        return fetchBlob("/export/docx");
    },
};
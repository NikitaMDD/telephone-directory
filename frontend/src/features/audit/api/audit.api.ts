import { api } from "@/shared/api";

export interface Audit {
    id: string;

    action: "CREATE" | "UPDATE" | "DELETE";

    entity: string;

    entityId: string;

    oldValue?: any;

    newValue?: any;

    createdAt: string;

    user?: {
        id: string;
        name: string;
        login: string;
    };
}

export const auditApi = {
    getAll() {
        return api<Audit[]>("/audit");
    },
};
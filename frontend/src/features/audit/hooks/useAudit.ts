import { useQuery } from "@tanstack/react-query";

import { auditApi } from "../api/audit.api";

export function useAudit() {
    return useQuery({
        queryKey: ["audit"],
        queryFn: auditApi.getAll,
    });
}
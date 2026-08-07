import { Typography } from "@/shared/ui/Typography";
import { AuditTable } from "@/features/audit/components/AuditTable";

import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";

export function LogsPage() {
    return (
        <div className="space-y-6 p-8">

            <PageHeader
                title="Журнал действий"
                subtitle="История всех изменений в системе"
            />

            <AuditTable />

        </div>
    );
}
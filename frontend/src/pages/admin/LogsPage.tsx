import { Typography } from "@/shared/ui/Typography";
import { AuditTable } from "@/features/audit/components/AuditTable";

export function LogsPage() {
    return (
        <div className="space-y-6 p-8">

            <div>
                <Typography
                    variant="h1"
                    weight="bold"
                >
                    Журнал действий
                </Typography>

                <Typography color="secondary">
                    История всех изменений в
                    системе
                </Typography>
            </div>

            <AuditTable />

        </div>
    );
}
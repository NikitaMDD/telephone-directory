import {
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/shared/ui/Button";

interface Props {
    onEdit(): void;
    onDelete(): void;
}

export function LocationActions({
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                size="icon"
                variant="ghost"
                onClick={onEdit}
            >
                <Pencil size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={onDelete}
            >
                <Trash2 size={18} />
            </Button>
        </div>
    );
}
import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

import { LocationsTable } from "@/features/locations/components/LocationsTable";
import { LocationDialog } from "@/features/locations/components/LocationDialog";

import type { Location } from "@/features/locations/types";

export function LocationsPage() {
    const [search, setSearch] =
        useState("");

    const [open, setOpen] =
        useState(false);

    const [selectedLocation, setSelectedLocation] =
        useState<Location>();

    function handleCreate() {
        setSelectedLocation(
            undefined
        );

        setOpen(true);
    }

    function handleEdit(
        location: Location
    ) {
        setSelectedLocation(
            location
        );

        setOpen(true);
    }

    return (
        <div className="space-y-8 p-8">

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>

                    <Typography
                        variant="h1"
                        weight="bold"
                    >
                        Корпуса
                    </Typography>

                    <Typography
                        color="secondary"
                    >
                        Управление корпусами университета
                    </Typography>

                </div>

                <Button
                    onClick={handleCreate}
                >
                    <Plus size={18} />

                    Добавить корпус
                </Button>

            </div>

            <Card className="p-5">

                <Input
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    placeholder="Поиск корпуса..."
                />

            </Card>

            <LocationsTable
                search={search}
                onEdit={handleEdit}
            />

            <LocationDialog
                open={open}
                location={selectedLocation}
                onClose={() =>
                    setOpen(false)
                }
            />

        </div>
    );
}
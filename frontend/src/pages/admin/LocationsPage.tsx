import { useState } from "react";

import { Plus, Search, X } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

import { LocationsTable } from "@/features/locations/components/LocationsTable";
import { LocationDialog } from "@/features/locations/components/LocationDialog";

import type { Location } from "@/features/locations/types";

import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";

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

                <PageHeader
                    title="Корпуса"
                    subtitle="Управление корпусами университета"
                    actions={
                        <Button
                            onClick={handleCreate}
                        >
                            Добавить корпус
                        </Button>
                    }
                />

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
                    leftIcon={
                        <Search
                            size={18}
                        />
                    }
                    rightIcon={
                        search ? (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="transition-colors hover:text-foreground"
                            >
                                <X size={18} />
                            </button>
                        ) : null
                    }
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
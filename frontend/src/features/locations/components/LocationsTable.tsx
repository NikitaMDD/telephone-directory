import { useMemo, useState } from "react";

import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Loader } from "@/shared/ui/Loader";
import { Typography } from "@/shared/ui/Typography";

import { useLocations } from "../hooks/useLocations";

import { LocationActions } from "./LocationActions";
import { LocationDeleteDialog } from "./LocationDeleteDialog";

import type { Location } from "../types";

interface Props {
    search: string;
    onEdit(
        location: Location
    ): void;
}

export function LocationsTable({
    search,
    onEdit,
}: Props) {
    const {
        data: locations = [],
        isPending,
        isError,
    } = useLocations();

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [
        locationToDelete,
        setLocationToDelete,
    ] = useState<Location>();

    const filteredLocations =
        useMemo(() => {
            const value =
                search.toLowerCase();

            return locations.filter(
                (location) =>
                    `
${location.name}
${location.address ?? ""}
`
                        .toLowerCase()
                        .includes(value)
            );
        }, [locations, search]);

    function handleOpenDelete(
        location: Location
    ) {
        setLocationToDelete(location);
        setDeleteOpen(true);
    }

    function handleCloseDelete() {
        setDeleteOpen(false);
    }

    if (isPending) {
        return (
            <Card className="flex min-h-96 items-center justify-center">
                <Loader size="lg" />
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="flex min-h-96 items-center justify-center">
                <Typography color="danger">
                    Не удалось загрузить корпуса
                </Typography>
            </Card>
        );
    }

    if (!filteredLocations.length) {
        return (
            <Card>
                <EmptyState
                    title="Корпуса не найдены"
                    description="Добавьте первый корпус."
                />
            </Card>
        );
    }

    return (
        <>
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="glass-table">

                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Адрес</th>
                                <th className="w-24" />
                            </tr>
                        </thead>

                        <tbody>
                            {filteredLocations.map((location) => (
                                <tr key={location.id}>
                                    <td>
                                        <Typography weight="medium">
                                            {location.name}
                                        </Typography>
                                    </td>

                                    <td>{location.address || "-"}</td>

                                    <td>
                                        <LocationActions
                                            onEdit={() => onEdit(location)}
                                            onDelete={() =>
                                                handleOpenDelete(location)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </Card>

            <LocationDeleteDialog
                open={deleteOpen}
                location={locationToDelete}
                onClose={handleCloseDelete}
            />
        </>
    );
}
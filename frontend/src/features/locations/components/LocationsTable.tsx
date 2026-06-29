import { useMemo } from "react";

import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Loader } from "@/shared/ui/Loader";
import { Typography } from "@/shared/ui/Typography";

import {
    useDeleteLocation,
    useLocations,
} from "../hooks/useLocations";

import { LocationActions } from "./LocationActions";

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

    const deleteMutation =
        useDeleteLocation();

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
        <Card className="overflow-hidden">
            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-surface">

                        <tr>

                            <th className="px-6 py-4 text-left font-semibold">
                                Название
                            </th>

                            <th className="px-6 py-4 text-left font-semibold">
                                Адрес
                            </th>

                            <th className="w-24" />

                        </tr>

                    </thead>

                    <tbody>

                        {filteredLocations.map(
                            (location) => (
                                <tr
                                    key={
                                        location.id
                                    }
                                    className="border-t transition-colors hover:bg-surface"
                                >
                                    <td className="px-6 py-4">

                                        <Typography
                                            weight="medium"
                                        >
                                            {
                                                location.name
                                            }
                                        </Typography>

                                    </td>

                                    <td className="px-6 py-4">

                                        {location.address ||
                                            "-"}

                                    </td>

                                    <td className="px-6 py-4">

                                        <LocationActions
                                            onEdit={() =>
                                                onEdit(
                                                    location
                                                )
                                            }
                                            onDelete={() => {
                                                if (
                                                    window.confirm(
                                                        `Удалить корпус "${location.name}"?`
                                                    )
                                                ) {
                                                    deleteMutation.mutate(
                                                        location.id
                                                    );
                                                }
                                            }}
                                        />

                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>
        </Card>
    );
}
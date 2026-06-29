import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/shared/ui/Input";

import {
    locationSchema,
    type LocationFormValues,
} from "../schemas/location.schema";

import {
    useCreateLocation,
    useUpdateLocation,
} from "../hooks/useLocations";

import type { Location } from "../types";

interface Props {
    id?: string;
    location?: Location;
    onSuccess(): void;
}

export function LocationForm({
    id,
    location,
    onSuccess,
}: Props) {
    const createMutation =
        useCreateLocation();

    const updateMutation =
        useUpdateLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } =
        useForm<LocationFormValues>({
            resolver:
                zodResolver(locationSchema),

            defaultValues: {
                name:
                    location?.name ?? "",

                address:
                    location?.address ?? "",
            },
        });

    async function onSubmit(
        values: LocationFormValues
    ) {
        if (location) {
            await updateMutation.mutateAsync({
                id: location.id,
                data: values,
            });
        } else {
            await createMutation.mutateAsync(
                values
            );
        }

        onSuccess();
    }

    return (
        <form
            id={id}
            onSubmit={handleSubmit(
                onSubmit
            )}
            className="space-y-5"
        >
            <Input
                label="Название корпуса"
                error={errors.name?.message}
                {...register("name")}
            />

            <Input
                label="Адрес"
                {...register("address")}
            />
        </form>
    );
}
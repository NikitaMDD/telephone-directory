import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { locationsApi } from "../api/locations.api";

import type {
    UpdateLocationDto,
} from "../types";

export function useLocations() {
    return useQuery({
        queryKey: ["locations"],
        queryFn: locationsApi.getAll,
    });
}

export function useCreateLocation() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn:
            locationsApi.create,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    "locations",
                ],
            });
        },
    });
}

export function useUpdateLocation() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateLocationDto;
        }) =>
            locationsApi.update(
                id,
                data
            ),

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    "locations",
                ],
            });
        },
    });
}

export function useDeleteLocation() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn:
            locationsApi.remove,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    "locations",
                ],
            });
        },
    });
}
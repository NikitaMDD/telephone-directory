import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { employeesApi } from "../api/employees.api";

import type { UpdateEmployeeDto } from "../types";

export function useEmployees() {
    return useQuery({
        queryKey: ["employees"],
        queryFn: employeesApi.getAll,
    });
}

export function useCreateEmployee() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn:
            employeesApi.create,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    "employees",
                ],
            });
        },
    });
}

export function useUpdateEmployee() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateEmployeeDto;
        }) =>
            employeesApi.update(
                id,
                data
            ),

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    "employees",
                ],
            });
        },
    });
}

export function useDeleteEmployee() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn:
            employeesApi.remove,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    "employees",
                ],
            });
        },
    });
}
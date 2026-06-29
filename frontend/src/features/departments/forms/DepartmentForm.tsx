import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";

import {
    departmentSchema,
    departmentTypes,
    type DepartmentFormValues,
} from "../schemas/department.schema";

import {
    useCreateDepartment,
    useUpdateDepartment,
    useDepartments,
} from "../hooks/useDepartments";

import { useLocations } from "@/features/locations/hooks/useLocations";

import type {
    Department,
    DepartmentType,
} from "../types";

import type { Location } from "@/features/locations/types";

interface Props {
    id?: string;
    department?: Department;
    onSuccess(): void;
}

export function DepartmentForm({
    id,
    department,
    onSuccess,
}: Props) {
    const createMutation =
        useCreateDepartment();

    const updateMutation =
        useUpdateDepartment();

    const departmentLabels: Record<
        DepartmentType,
        string
    > = {
        FACULTY: "Факультет",
        DEPARTMENT: "Кафедра",
        ADMINISTRATION: "Администрация",
        OTHER: "Другое",
    };

    const {
        data: locations = [],
    } = useLocations();

    const {
        data: departments = [],
    } = useDepartments();

    const {
        register,
        control,
        handleSubmit,
        formState: {
            errors,
        },
    } =
        useForm<DepartmentFormValues>({
            resolver:
                zodResolver(
                    departmentSchema
                ),

            defaultValues: {
                name:
                    department?.name ??
                    "",

                abbreviation:
                    department?.abbreviation ??
                    "",

                type:
                    department?.type ??
                    "DEPARTMENT",

                locationId:
                    department?.locationId ??
                    "",

                parentId:
                    department?.parentId ??
                    "",
            },
        });

    async function onSubmit(
        values: DepartmentFormValues
    ) {
        try {
            if (department) {
                await updateMutation.mutateAsync(
                    {
                        id: department.id,
                        data: values,
                    }
                );
            } else {
                await createMutation.mutateAsync(
                    values
                );
            }

            onSuccess();
        } catch (error) {
            console.error(error);
        }
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
                label="Название"
                error={
                    errors.name?.message
                }
                {...register("name")}
            />

            <Input
                label="Сокращение"
                {...register(
                    "abbreviation"
                )}
            />

            <Controller
                control={control}
                name="type"
                render={({ field }) => (
                    <Select<DepartmentType>
                        label="Тип"
                        items={departmentTypes}
                        value={field.value}
                        onValueChange={field.onChange}
                        error={errors.type?.message}
                        getLabel={(item) => departmentLabels[item]}
                        getValue={(item) => item}
                    />
                )}
            />

            <Controller
                control={control}
                name="locationId"
                render={({
                    field,
                }) => (
                    <Select<Location>
                        label="Корпус"

                        items={
                            locations
                        }

                        value={
                            field.value
                        }

                        onValueChange={
                            field.onChange
                        }

                        error={
                            errors
                                .locationId
                                ?.message
                        }

                        getLabel={(
                            location
                        ) =>
                            location.name
                        }

                        getValue={(
                            location
                        ) =>
                            location.id
                        }
                    />
                )}
            />

            <Controller
                control={control}
                name="parentId"
                render={({
                    field,
                }) => (
                    <Select<Department>
                        label="Родительское подразделение"

                        placeholder="Не выбрано"

                        items={departments.filter(
                            (item) =>
                                item.id !==
                                department?.id
                        )}

                        value={
                            field.value ??
                            ""
                        }

                        onValueChange={
                            field.onChange
                        }

                        getLabel={(
                            department
                        ) =>
                            department.name
                        }

                        getValue={(
                            department
                        ) =>
                            department.id
                        }
                    />
                )}
            />
        </form>
    );
}
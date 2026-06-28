import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";

import {
    useCreateEmployee,
    useUpdateEmployee,
} from "../hooks/useEmployees";

import { useDepartments } from "@/features/departments/hooks/useDepartments";

import {
    employeeSchema,
    type EmployeeFormValues,
} from "../schemas/employee.schema";

import type { Employee } from "../types";
import type { Department } from "@/features/departments/types";

interface Props {
    id?: string;
    employee?: Employee;
    onSuccess(): void;
}

export function EmployeeForm({
    id,
    employee,
    onSuccess,
}: Props) {
    const createMutation =
        useCreateEmployee();

    const updateMutation =
        useUpdateEmployee();

    const {
        data: departments = [],
    } = useDepartments();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } =
        useForm<EmployeeFormValues>({
            resolver:
                zodResolver(
                    employeeSchema
                ),

            defaultValues: {
                lastName:
                    employee?.lastName ??
                    "",

                firstName:
                    employee?.firstName ??
                    "",

                middleName:
                    employee?.middleName ??
                    "",

                position:
                    employee?.position ??
                    "",

                internalPhone:
                    employee?.internalPhone ??
                    "",

                cityPhone:
                    employee?.cityPhone ??
                    "",

                email:
                    employee?.email ??
                    "",

                room:
                    employee?.room ??
                    "",

                departmentId:
                    employee?.departmentId ??
                    "",
            },
        });

    async function onSubmit(
        values: EmployeeFormValues
    ) {
        try {
            if (employee) {
                await updateMutation.mutateAsync(
                    {
                        id: employee.id,
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
                label="Фамилия"
                error={
                    errors.lastName
                        ?.message
                }
                {...register(
                    "lastName"
                )}
            />

            <Input
                label="Имя"
                error={
                    errors.firstName
                        ?.message
                }
                {...register(
                    "firstName"
                )}
            />

            <Input
                label="Отчество"
                {...register(
                    "middleName"
                )}
            />

            <Input
                label="Должность"
                error={
                    errors.position
                        ?.message
                }
                {...register(
                    "position"
                )}
            />

            <Controller
                control={control}
                name="departmentId"
                render={({
                    field,
                }) => (
                    <Select<Department>
                        label="Подразделение"
                        items={
                            departments
                        }
                        value={
                            field.value
                        }
                        error={
                            errors
                                .departmentId
                                ?.message
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

            <Input
                label="Внутренний телефон"
                {...register(
                    "internalPhone"
                )}
            />

            <Input
                label="Городской телефон"
                {...register(
                    "cityPhone"
                )}
            />

            <Input
                label="Email"
                error={
                    errors.email
                        ?.message
                }
                {...register(
                    "email"
                )}
            />

            <Input
                label="Кабинет"
                {...register(
                    "room"
                )}
            />
        </form>
    );
}
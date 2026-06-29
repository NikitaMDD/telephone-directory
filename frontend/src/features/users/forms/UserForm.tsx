import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";

import {
    userSchema,
    roles,
    type UserFormValues,
} from "../schemas/user.schema";

import {
    useCreateUser,
    useUpdateUser,
} from "../hooks/useUsers";

import {
    ROLE_OPTIONS,
} from "@/shared/constants/roles";

import type {
    User,
    Role,
} from "../types";

interface Props {
    id?: string;
    user?: User;
    onSuccess(): void;
}

export function UserForm({
    id,
    user,
    onSuccess,
}: Props) {
    const createMutation =
        useCreateUser();

    const updateMutation =
        useUpdateUser();

    const {
        register,
        control,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<UserFormValues>({
        resolver: zodResolver(
            userSchema
        ),

        defaultValues: {
            name:
                user?.name ?? "",

            login:
                user?.login ?? "",

            password: "",

            role:
                user?.role ??
                "USER",
        },
    });

    async function onSubmit(
        values: UserFormValues
    ) {
        try {
            if (user) {
                await updateMutation.mutateAsync({
                    id: user.id,
                    data: values,
                });
            } else {
                await createMutation.mutateAsync(
                    values as Required<UserFormValues>
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
                label="Имя"
                error={
                    errors.name?.message
                }
                {...register("name")}
            />

            <Input
                label="Логин"
                error={
                    errors.login?.message
                }
                {...register("login")}
            />

            <Input
                type="password"
                label={
                    user
                        ? "Новый пароль"
                        : "Пароль"
                }
                placeholder={
                    user
                        ? "Оставьте пустым, чтобы не менять"
                        : "Введите пароль"
                }
                error={
                    errors.password
                        ?.message
                }
                {...register(
                    "password"
                )}
            />

            <Controller
                control={control}
                name="role"
                render={({
                    field,
                }) => (
                    <Select
                        items={ROLE_OPTIONS}
                        value={field.value}
                        onValueChange={field.onChange}
                        error={errors.role?.message}
                        getLabel={(item) => item.label}
                        getValue={(item) => item.value}
                    />
                )}
            />
        </form>
    );
}
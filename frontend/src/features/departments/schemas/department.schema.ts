import { z } from "zod";

export const departmentTypes = [
    "FACULTY",
    "DEPARTMENT",
    "ADMINISTRATION",
    "OTHER",
] as const;

export const departmentSchema = z.object({
    name: z
        .string()
        .min(1, "Введите название"),

    abbreviation:
        z.string().optional(),

    type: z.enum(
        departmentTypes,
        {
            error: "Выберите тип подразделения",
        }
    ),

    locationId: z
        .string()
        .min(1, "Выберите корпус"),

    parentId: z.string().optional(),
});

export type DepartmentFormValues =
    z.infer<typeof departmentSchema>;
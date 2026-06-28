import { z } from "zod";

export const employeeSchema = z.object({
    lastName: z
        .string()
        .min(1, "Введите фамилию"),

    firstName: z
        .string()
        .min(1, "Введите имя"),

    middleName: z.string().optional(),

    position: z
        .string()
        .min(1, "Введите должность"),

    internalPhone: z.string().optional(),

    cityPhone: z.string().optional(),

    email: z
        .email("Некорректный email")
        .optional()
        .or(z.literal("")),

    room: z.string().optional(),

    departmentId: z
        .string()
        .min(1, "Выберите подразделение"),
});

export type EmployeeFormValues =
    z.infer<typeof employeeSchema>;
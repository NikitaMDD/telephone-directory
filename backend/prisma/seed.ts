import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding...");

    /*
     * Admin
     */

    const adminExists = await prisma.user.findUnique({
        where: {
            login: "admin",
        },
    });

    if (!adminExists) {
        const passwordHash = await bcrypt.hash(
            "N7x@2026_Admin!",
            10
        );

        await prisma.user.create({
            data: {
                name: "Системный администратор",
                login: "admin",
                passwordHash,
                role: "ADMIN",
            },
        });

        console.log("Admin created");
    }

    /*
     * Location
     */

    let location = await prisma.location.findFirst({
        where: {
            name: "Главный корпус",
        },
    });

    if (!location) {
        location = await prisma.location.create({
            data: {
                name: "Главный корпус",
                sortOrder: 1,
            },
        });

        console.log("Location created");
    }

    /*
     * Department
     */

    const department = await prisma.department.findFirst({
        where: {
            name: "Администрация",
        },
    });

    if (!department) {
        await prisma.department.create({
            data: {
                name: "Администрация",
                abbreviation: "ADM",
                type: "ADMINISTRATION",
                locationId: location.id,
                sortOrder: 1,
            },
        });
        console.log("Department created");
    }

    console.log("Seed finished");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
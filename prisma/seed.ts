import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    await prisma.user.createMany({
        data: [
            { nombre: "Admin", email: "admin@cuni.com", password: "111222", rol: "ADMIN", numeroCel: "123123", direccion: "avenida cuni" }
        ]
    });

    console.log("Seed completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

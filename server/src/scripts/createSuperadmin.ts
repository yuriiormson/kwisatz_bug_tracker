import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const email = 'yurii.ormson@icloud.com';
    const username = 'Kwisatz_Haderbug';
    const password = process.env.SUPERADMIN_PASSWORD;

    if (!password) {
        console.error('Error: SUPERADMIN_PASSWORD environment variable is not set.');
        process.exit(1);
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username }
            ]
        }
    });

    if (existingUser) {
        console.log('Superadmin user already exists.');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username: 'Kwisatz_Haderbug',
            firstName: 'Shai-Hulud',
            lastName: 'FremenWatch',
            email: 'yurii.ormson@icloud.com',
            password: hashedPassword,
            projectName: 'Arrakis',
            role: 'superadmin',
            avatar: `https://ui-avatars.com/api/?name=Shai-Hulud%20FremenWatch&background=random`,
        },
    });

    console.log(`Superadmin user created: ${user.username} (${user.email})`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

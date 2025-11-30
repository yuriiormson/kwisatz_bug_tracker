import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily user cleanup job...');
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // Delete users who haven't logged in for 1 month
        // OR users who never logged in (lastLogin is null) and were created > 1 month ago
        // AND exclude superadmin users
        const result = await prisma.user.deleteMany({
            where: {
                role: {
                    not: 'superadmin'
                },
                OR: [
                    {
                        lastLogin: {
                            lt: oneMonthAgo,
                        },
                    },
                    {
                        lastLogin: null,
                        createdAt: {
                            lt: oneMonthAgo,
                        },
                    },
                ],
            },
        });

        console.log(`Cleanup complete. Deleted ${result.count} inactive users.`);
    } catch (error) {
        console.error('Error running cleanup job:', error);
    }
});

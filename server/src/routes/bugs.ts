import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all bugs (with optional filtering)
router.get('/', authenticateToken, async (req, res) => {
    const { status, priority, search } = req.query;

    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
        where.OR = [
            { title: { contains: String(search) } },
            { description: { contains: String(search) } },
        ];
    }

    try {
        const bugs = await prisma.bug.findMany({
            where,
            orderBy: { updatedAt: 'desc' },
        });
        res.json(bugs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bugs' });
    }
});

// Create a bug
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
    const { title, description, priority, severity, assigneeId } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const bug = await prisma.bug.create({
            data: {
                title,
                description,
                priority,
                severity,
                reporterId: userId,
                assigneeId: assigneeId || null,
            },
        });
        res.json(bug);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create bug' });
    }
});

// Update a bug
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { status, priority, assigneeId } = req.body;

    try {
        const bug = await prisma.bug.update({
            where: { id },
            data: {
                status,
                priority,
                assigneeId,
            },
        });
        res.json(bug);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update bug' });
    }
});

export default router;

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

// Register
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            },
        });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: '24h',
        });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: '24h',
        });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;

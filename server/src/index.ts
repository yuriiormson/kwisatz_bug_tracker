import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

import authRoutes from './routes/auth';
import bugRoutes from './routes/bugs';
import userRoutes from './routes/users';

app.use('/api/auth', authRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export { prisma };

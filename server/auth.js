const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashPassword }
        });
        res.status(400).json({ error: 'Email already exists' });
    } catch (error) {
        res.status(400).json({ error: 'Email already exists' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid creadentials' });
    }
});

module.exports = router;
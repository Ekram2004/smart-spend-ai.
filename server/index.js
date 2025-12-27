const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client')
const { categorizeTransaction } = require('./aiServer');


const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "SmartSpend AI API is live!" });
});

const prisma = new PrismaClient();

app.post('/api/transactions', async (req, res) => {
    const { description, amount } = req.body;

    try {
        const category = await categorizeTransaction(description);

        const newTransaction = await prisma.transaction.create({
            data: {
                description,
                amount: parseFloat(amount),
                category
            }
        });
        res.json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process transaction' });
    }
});

app.get('/api/transactions', async (req, res) => {
    const transactions = await prisma.transaction.findMany({
        orderBy: { date: 'desc' }
    });
    res.json(transactions);
})


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
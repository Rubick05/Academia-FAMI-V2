// backend/routes/horarios.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/horarios', async (req, res) => {
    try {
        const horarios = await prisma.clase.findMany({
            include: {
                profesor: true,
                salon: true,
            }
        });
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los horarios' });
    }
});

module.exports = router;

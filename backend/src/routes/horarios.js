// backend/routes/horarios.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/horarios', async (req, res) => {
    try {
        // Obtener los horarios
        const horarios = await prisma.clase.findMany({
            include: {
                profesor: true,
                salon: true,
            },
        });

        // Organizar los horarios por día
        const horariosPorDia = horarios.reduce((acc, clase) => {
            const dia = new Date(clase.horario).toLocaleString('es-ES', { weekday: 'long' });
            
            // Formatear el objeto de clase para que tenga solo los campos que necesitas
            const claseFormateada = {
                horario: clase.horario,
                profesor: clase.profesor.nombre, // Asumiendo que el nombre está en 'profesor.nombre'
                salon: clase.salon.nombre, // Asumiendo que el nombre del salón está en 'salon.nombre'
                estilo: clase.estilo,
                reglas: clase.reglas,
                nivel: clase.nivel,
                videoUrl: clase.videoUrl,
            };

            if (!acc[dia]) {
                acc[dia] = [];
            }

            acc[dia].push(claseFormateada);
            return acc;
        }, {});

        // Responder con los datos organizados por día
        res.json(horariosPorDia);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los horarios' });
    }
});

module.exports = router;

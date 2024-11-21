import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

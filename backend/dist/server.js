"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5432;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

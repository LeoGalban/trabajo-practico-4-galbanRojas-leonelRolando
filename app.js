import express from "express";
import sequelize from "./src/config/database.js";
import dotenv from "dotenv";
import characterRoutes from './src/routes/character.routes.js';

dotenv.config(); // Carga las variables de entorno al inicio

const app = express();
app.use(express.json());
const PORT = process.env.BD_PORT || 4000;
sequelize.sync()
    .then(() => {
        console.log("Base de datos conectada correctamente");
        app.listen(PORT, () => {
            console.log(`servidor corriendo en: http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error al conectar la base de datos:", err);
    });
app.get('/', (req, res) => {
    res.send('Api funcionando');
});
app.use("/api/characters", characterRoutes);
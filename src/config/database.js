import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config(); //Carga automaticamente las variables que tengo en el archivo
                 //  .env y las guarda en process.env

const sequelize = new Sequelize (
    process.env.BD_NAME, // me dice que lea el nonbre en .env
    process.env.BD_USER,// usuario
    process.env.BD_PASSWORD,
    { 
        host: process.env.BD_HOST,
        dialect: process.env.BD_DIALECT
    }
);

export default Sequelize
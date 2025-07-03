import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const characters = sequelize.define('characters', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    ki: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    race: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
});
export default characters;
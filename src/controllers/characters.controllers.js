import characters from "../models/character.models.js";
export const createCharacter = async (req, res) => {
    const { name, race, gender, ki } = req.body;
    if (!name || !race || !ki || !gender){
        return res.status(400).json ({ message: "Faltan datos obligatorios" });
    }
    if (!Number.isInteger(ki)){
        return res.status(400).json ({ message: "El Ki debe ser un número entero" });
    }
    if (gender !== "Female" && gender !== "Male"){
        return res.status(400).json ({ message: "No es válido, el género debe ser 'Male' o 'Female'" });
    }
    try{
        const characterExist = await characters.findOne({ name});
        if (characterExist){
            return res.status(400).json ({ message: `El personaje con nombre '${name}' ya existe.` });
        }
        const newCharacter = await characters.create({ name, ki, race, gender });
        res.status(201).json({ message: "Personaje creado exitosamente", character: newCharacter });
    } catch (error){
        console.error("Error al crear personaje... error;", error);
        res.status(500).json ({ message: "Error interno del servidor al crear el personaje" });
    }
};
export const getAllCharacters = async (req, res) => {
    try{
        const allCharacters = await characters.findAll();
        if (allCharacters.length === 0) {
            return res.status(200).json({ message: "No se encontraron personajes" });
        }
        res.status(200).json(allCharacters);
    }catch(error){
        console.error("Error al obtener todos los personajes... error;", error);
        res.status(500).json ({ message: "Error interno del servidor al obtener personajes" });
    }
};
export const getCharacterID = async (req, res)=> {
    try{
        const { id } = req.params;
        const character = await characters.findByPk(id);
        if (!character) {
            return res.status(404).json({ message: `(Not found): Personaje con ID ${id} no encontrado` });
        }
        res.status(200).json(character);
    }catch (error){
        console.error("Error al buscar personaje por ID:", error);
        res.status(500).json ({ message: "Error interno del servidor al buscar personaje por ID... lo siento :(" });
    }
};
export const characterUpdate = async (req, res)=> {
    const { id } = req.params;
    const { name, race, gender, ki } = req.body;
    try{
        const character = await characters.findByPk(id);
        if (!character){
            return res.status(404).json({ message: `Personaje con ID ${id} no encontrado para actualizar D:` });
        }
        if (!name || !race || !gender || !ki){
            return res.status(400).json({ message: "Faltan datos obligatorios para la actualización: name, race, gender, ki. Intentalo de nuevo" });
        }
        if (!Number.isInteger(ki)) {
            return res.status(400).json({ message: "El Ki debe ser un número entero válido" });
        }
        if (gender !== 'Male' && gender !== 'Female') {
            return res.status(400).json({ message: "El género debe ser 'Male' o 'Female', por el momento no existe otro." });
        }
        const nameUsed = await characters.findOne({ where: { name } });
        if (nameUsed && nameUsed.id !== character.id) {
            return res.status(400).json({ message: `Ya existe un personaje con el nombre '${name}' !!! OJO` });
        }
        await character.update({ name, ki, race, gender });
        return res.status(200).json({ message: "Personaje actualizado exitosamente", character }); // Retornar el personaje actualizado
    }catch(error) {
        console.error("Error al actualizar el personaje:", error);
        return res.status(500).json({ message: 'Error interno del servidor al actualizar el personaje, lo siento mucho... :(' });
    }
};
export const characterDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const character = await characters.findByPk(id);
        if (!character) {
            return res.status(404).json({ message: `Personaje con ID ${id} no encontrado para eliminar.` });
        }
        await character.destroy();
        res.status(200).json({ message: `Personaje con ID ${id} eliminado correctamente!` });
    } catch (error) {
        console.error("Error al eliminar el personaje... error:", error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el personaje, ups...' });
    }
}
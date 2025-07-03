import express from "express";
import { 
    createCharacter, getAllCharacters, getCharacterID, characterUpdate, characterDelete 
} from "../controllers/characters.controllers.js";
const router = express.Router();

router.get('/', getAllCharacters);
router.get('/:id', getCharacterID);
router.post('/', createCharacter);
router.put('/:id', characterUpdate);
router.delete('/:id', characterDelete);

export default router;
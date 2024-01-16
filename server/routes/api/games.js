import express from "express";
import { 
    addGame, 
    deleteGame, 
    getActiveGames, 
    getGames, 
    modifyGame,
    getGameFromLink
} from "../../controllers/gameControllers.js";
import verifyJWT from "../../middleware/verifyJWT.js";
import verifyAmin from "../../middleware/verifyAdmin.js";


const router = express.Router();

router.route('/').get(getActiveGames);

router.route('/name/:link').get(getGameFromLink);

router.route('/admin')
    .get(verifyJWT, verifyAmin, getGames)
    .post(verifyJWT, verifyAmin, addGame)
    .put(verifyJWT, verifyAmin, modifyGame)
    .delete(verifyJWT, verifyAmin, deleteGame);

export default router;
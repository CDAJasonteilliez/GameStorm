import express from "express";
import { 
    deleteScore, 
    deleteScoreAdmin, 
    getScore, 
    getScoreAdmin, 
    getScoreGame, 
    newScore 
} from "../../controllers/scoreControllers.js";
import verifyAmin from "../../middleware/verifyAdmin.js";
import verifyJWT from "../../middleware/verifyJWT.js";

const router = express.Router();

router.route('/')
    .get(verifyJWT, getScore)
    .post(verifyJWT, newScore)
    .delete(verifyJWT, deleteScore);

router.route('/game/:id')
    .get(getScoreGame);

router.route('/admin')
    .get(verifyJWT, verifyAmin, getScoreAdmin)
    .delete(verifyJWT, verifyAmin, deleteScoreAdmin)

export default router;
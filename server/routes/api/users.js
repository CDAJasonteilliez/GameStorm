import express from "express";
import {
    createNewUser,
} from "../../controllers/userControllers.js";

const router = express.Router();

router.route('/').post(createNewUser)

export default router;
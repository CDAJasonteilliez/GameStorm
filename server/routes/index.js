import express from "express";
import apiUsers from "./api/users.js";
import apiAuth from "./api/auth.js";
import apiGames from "./api/games.js";
import apiScores from "./api/scores.js";

const router = express.Router();

router.use("/users", apiUsers);
router.use("/auth", apiAuth);
router.use("/games", apiGames);
router.use("/scores", apiScores);

export default router;
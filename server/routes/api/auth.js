import express from "express";
import loginLimiter from "../../middleware/loginLimiter.js";
import { login, logout, refresh } from "../../controllers/authControllers.js";

const router = express.Router();

router.route("/").post(loginLimiter, login);
router.route("/logout").get(logout);
router.route("/refresh").get(refresh);

export default router;
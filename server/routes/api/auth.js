import express from "express";
import loginLimiter from "../../middleware/loginLimiter.js";
import { login } from "../../controllers/authControllers.js";

const router = express.Router();

router.route("/").post(loginLimiter, login);

export default router;
import express from "express";
import apiUsers from "./api/users.js";
import apiAuth from "./api/auth.js";

const router = express.Router();

router.use("/users", apiUsers);
router.use("/auth", apiAuth);

export default router;